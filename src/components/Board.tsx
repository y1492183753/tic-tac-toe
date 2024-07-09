import React from 'react';
import Square from './Square';
import GameModel from '../consts/GameModelConfig';
import { connect } from 'react-redux';
import { makeMove, resetBoard, jumpTo, changeMode, chooseAI } from '../store/actions';
import type { GoBangState } from '../store/index';
import clickForAI from '../utils/getBestMoveAI';

interface GoBangBoardProps {
    mode: number;
    board: any[][];
    history: any[][][];
    stepNumber: number;
    winner: 'X' | 'O' | null;
    isBoardFull: boolean;
    xIsNext: boolean;
    AI: 'X' | 'O' | null;
    makeMove: typeof makeMove;
    resetBoard: typeof resetBoard;
    jumpTo: typeof jumpTo;
    changeMode: typeof changeMode;
    chooseAI: typeof chooseAI;
}
class Board extends React.Component<GoBangBoardProps> {
    /**
     * AI下棋，更新dom时执行
     */
    componentDidUpdate () {
        if (this.props.AI !== (this.props.xIsNext ? GameModel[this.props.mode].SquareName[0] : GameModel[this.props.mode].SquareName[1])) return;// 轮到AI下棋了
        const bestMove = clickForAI(this.props.board, this.props.AI, GameModel[0].SquareName);
        if (bestMove) {
            const [row, col] = bestMove;
            this.props.makeMove(row, col);
        }// 可以下棋了
    }
    /**
     * 下棋事件
     * @param rowIndex
     * @param columnIndex
     * @returns
     */
    handle = (rowIndex: number, columnIndex: number) => {
        if (this.props.winner !== null || this.props.isBoardFull) return;// 结局已出则不能下棋
        if (this.props.history[this.props.stepNumber][rowIndex][columnIndex] !== null) return;// 下的位置不能有棋子
        if (this.props.mode === 0 && this.props.AI === null) return;// 先选择AI对战才能下棋 && 井字棋
        if (this.props.mode === 0 && this.props.AI === (this.props.xIsNext ? GameModel[this.props.mode].SquareName[0] : GameModel[this.props.mode].SquareName[1])) return;// 轮到AI时不能下棋 && 井字棋
        this.props.makeMove(rowIndex, columnIndex);// 可以下棋了
    };
    /**
     * 跳转历史记录
     * @param step
     */
    jumpToHistory = (step: number) => {
        if (step > 0 && step < this.props.history.length) {
            this.props.jumpTo(step);
        } else {
            this.props.resetBoard(this.props.mode);
        }
    };
    /**
     * 切换模式
     */
    modeChange = () => {
        this.props.changeMode();
    };
    /**
     * 渲染棋盘
     * @returns
     */
    renderBoard = () => (
        <div>
            {this.props.board.map((row, rowIndex) => (
                <div key={rowIndex} className={GameModel[this.props.mode].name}>
                    {row.map((cell, columnIndex) => (
                        <Square
                            key={`${rowIndex}-${columnIndex}`}
                            value={cell}
                            onSquareClick={() => this.handle(rowIndex, columnIndex)}
                            mode={this.props.mode}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
    render () {
        const { mode, winner, isBoardFull } = this.props;
        // 渲染跳转按钮，只有当 stepNumber 小于等于当前步骤时才渲染
        const moves = this.props.history.map((__, move) => {
            if (move > this.props.stepNumber) {
                return null;
            }
            const description = move > 0 ? `Go to move #${move}` : 'Start over';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpToHistory(move)} key={move}>
                        {description}
                    </button>
                </li>
            );
        }).filter(Boolean);

        return (
            <div>
                <button onClick={this.modeChange} className='handOver'>切换</button>
                <h1>{GameModel[mode].name}</h1>
                {this.props.stepNumber === 0 && this.props.AI === null && this.props.mode === 0 && <div>你想选择：
                    <button onClick={() => this.props.chooseAI('O')}>X</button> or <button onClick={() => this.props.chooseAI('X')}>O</button>
                </div>}
                {winner && (
                    <div>
                        <p>{winner === 'X' ? GameModel[mode].GameWinName[0] : GameModel[mode].GameWinName[1]}</p>
                    </div>
                )}
                {winner === null && !isBoardFull && <div>下一步轮到<span>{this.props.xIsNext ? GameModel[mode].SquareName[0] : GameModel[mode].SquareName[1]}</span></div>}
                {winner !== 'O' && winner !== 'X' && isBoardFull && <div>平局</div>}
                <div className="board">{this.renderBoard()}</div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
/**
 *将 store 中的状态映射到组件的 props 上
 * @param state
 * @returns
 */
const mapStateToProps = (state: GoBangState) => ({
    board: state.board,
    history: state.history,
    stepNumber: state.stepNumber,
    winner: state.winner,
    isBoardFull: state.isBoardFull,
    xIsNext: state.xIsNext,
    AI: state.AI,
});

const mapDispatchToProps = {
    makeMove,
    resetBoard,
    jumpTo,
    changeMode,
    chooseAI,
};
export default connect(mapStateToProps, mapDispatchToProps)(Board);
