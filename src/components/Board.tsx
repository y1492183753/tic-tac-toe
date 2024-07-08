import React from 'react';
import Square from './Square';
import GameModel from '../consts/GameModelConfig';
import { connect } from 'react-redux';
import { makeMove, resetBoard, jumpTo, changeMode } from '../store/actions';
import type { GoBangState } from '../store/index';

interface GoBangBoardProps {
    mode: number;
    board: any[][];
    history: any[][];
    stepNumber: number;
    winner: 'X' | 'O' | null;
    isBoardFull: boolean;
    makeMove: typeof makeMove;
    resetBoard: typeof resetBoard;
    jumpTo: typeof jumpTo;
    changeMode: typeof changeMode;
}

class Board extends React.Component<GoBangBoardProps> {
    // 在构造函数中绑定方法
    constructor (props: GoBangBoardProps) {
        super(props);
        this.handle = this.handle.bind(this);
        this.jumpToHistory = this.jumpToHistory.bind(this);
        this.modeChange = this.modeChange.bind(this);
    }
    /**
     * 下棋事件
     */
    handle = (rowIndex: number, columnIndex: number) => {
        this.props.makeMove(rowIndex, columnIndex);
    };
    /**
     * 跳转历史记录
     * @param step
     */
    jumpToHistory = (step: number) => {
        if (step >= 0 && step < this.props.history.length) {
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
                {winner && (
                    <div>
                        <p>{winner === 'X' ? GameModel[mode].GameWinName[0] : GameModel[mode].GameWinName[1]}</p>
                    </div>
                )}
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
});

const mapDispatchToProps = {
    makeMove,
    resetBoard,
    jumpTo,
    changeMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(Board);
