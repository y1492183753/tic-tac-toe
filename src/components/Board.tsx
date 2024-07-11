import React from 'react';
import Square from './Square';
import GAME_MODEL from '../consts/gameModelConfig';
import { connect } from 'react-redux';
import { makeMove, resetBoard, jumpTo, changeMode, chooseAI } from '../store/actions';
import type { GoBangState } from '../store/index';
import clickForAI from '../utils/getBestMoveAI';

interface GoBangBoardProps {
    /** 游戏模式 */
    mode: number;
    /** 棋盘 */
    board: any[][];
    /** 历史记录 */
    history: any[][][];
    /** 步骤次数 */
    stepNumber: number;
    /** 胜者 */
    winner: 'X' | 'O' | null;
    /** 棋盘是否已满 */
    isBoardFull: boolean;
    /** 下一步是否是X */
    xIsNext: boolean;
    /** AI的棋子 */
    AI: 'X' | 'O' | null;
    /** 下棋 */
    makeMove: typeof makeMove;
    /** 重置棋盘 */
    resetBoard: typeof resetBoard;
    /** 跳转到之前的记录 */
    jumpTo: typeof jumpTo;
    /** 改变游戏 */
    changeMode: typeof changeMode;
    /** 选择棋子 */
    chooseAI: typeof chooseAI;
}
class Board extends React.Component<GoBangBoardProps> {
    /**
     * AI下棋，更新dom时执行
     */
    componentDidUpdate () {
        if (this.props.stepNumber !== 0) return;
        if (this.props.AI !== (this.props.xIsNext ? GAME_MODEL[this.props.mode].player[0] : GAME_MODEL[this.props.mode].player[1])) return;// 轮到AI下棋了
        const bestMove = clickForAI(this.props.board, this.props.AI, GAME_MODEL[0].player);
        if (bestMove) {
            const [row, col] = bestMove;
            this.props.makeMove(row, col);
        }// AI可以下棋了
    }
    /**
     * 下棋事件
     * @param rowIndex
     * @param columnIndex
     * @returns
     */
    handle = (rowIndex: number, columnIndex: number) => {
        if (this.props.mode === 0 && this.props.AI === (this.props.xIsNext ? GAME_MODEL[this.props.mode].player[0] : GAME_MODEL[this.props.mode].player[1])) return;// 轮到AI时不能下棋 && 井字棋
        this.props.makeMove(rowIndex, columnIndex);// 玩家可以下棋了
        const newBoard = JSON.parse(JSON.stringify(this.props.board));
        newBoard[rowIndex][columnIndex] =  this.props.xIsNext ? 'X' : 'O';
        if (this.props.AI !== null) {
            const bestMove = clickForAI(newBoard, this.props.AI, GAME_MODEL[0].player);
            if (bestMove) {
                const [row, col] = bestMove;
                this.props.makeMove(row, col);// AI可以下棋了
            }
        }
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
        <>
            {this.props.board.map((row, rowIndex) => (
                row.map((cell, columnIndex) => (
                    <Square
                        key={`${rowIndex}-${columnIndex}`}
                        value={cell}
                        onSquareClick={() => this.handle(rowIndex, columnIndex)}
                        mode={this.props.mode}
                    />
                ))
            ))}

        </>
    );
    render () {
        const { mode, winner, isBoardFull } = this.props;
        const Winner = winner === 'X' ? GAME_MODEL[mode].player[0] : GAME_MODEL[mode].player[1];
        const nextPlayer = this.props.xIsNext ? GAME_MODEL[mode].player[0] : GAME_MODEL[mode].player[1];
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
                <h1>{GAME_MODEL[mode].name}</h1>
                {this.props.stepNumber === 0 && this.props.AI === null && this.props.mode === 0 && <div>你想选择：
                    <button onClick={() => this.props.chooseAI('O')}>X</button> or <button onClick={() => this.props.chooseAI('X')}>O</button>
                </div>}
                {winner && (
                    <div>
                        <p>{`${Winner}胜`}</p>
                    </div>
                )}
                {!winner && !isBoardFull && <div>下一步轮到<span>{nextPlayer}</span></div>}
                {!winner && isBoardFull && <div>平局</div>}
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
