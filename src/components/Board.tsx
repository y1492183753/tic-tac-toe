import React, { useCallback } from 'react';
import Square from './Square';
import GameModel from '../consts/GameModelConfig';
import { useSelector, useDispatch } from 'react-redux';
import { makeMove, resetBoard, jumpTo, changeMode } from '../store/actions';
import type { GoBangState } from '../store/index';

interface GoBangBoardProps {
    mode: number;
}
/**
 *棋盘
 * @param param0
 * @returns
 */
const Board: React.FC<GoBangBoardProps> = ({ mode }) => {
    // const { board, history, stepNumber, winner, isBoardFull } = useSelector((state: GoBangState) => state);
    const board = useSelector((state: GoBangState) => state.board);
    const history = useSelector((state: GoBangState) => state.history);
    const stepNumber = useSelector((state: GoBangState) => state.stepNumber);
    const winner = useSelector((state: GoBangState) => state.winner);
    const isBoardFull = useSelector((state: GoBangState) => state.isBoardFull);
    const dispatch = useDispatch();
    /**
     *下棋事件
     */
    const handle = (rowIndex: number, columnIndex: number) => {
        dispatch(makeMove(rowIndex, columnIndex));
    };
    /**
     *切换游戏
     */
    const handleModeChange = () => {
        dispatch(changeMode());
    };
    /**
     *跳转历史记录
     * @param step
     */
    function jumpToHistory (step: number) {
        if (step > 0 && step < history.length) {
            dispatch(jumpTo(step));
        } else {
            dispatch(resetBoard(mode));
        }
    }
    // 渲染跳转按钮，只有当 stepNumber 小于等于当前步骤时才渲染
    const moves = history.map((__, move) => {
        if (move > stepNumber) {
            return null;
        }
        const description = move > 0 ? `Go to move #${move}` : 'Start over';
        return (
            <li key={move}>
                <button onClick={() => jumpToHistory(move)} key={move}>
                    {description}
                </button>
            </li>
        );
    }).filter(Boolean);

    /**
     *渲染棋盘
     * @returns
     */
    const renderBoard = () => (
        <div>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className={GameModel[mode].name}>
                    {row.map((cell, columnIndex) => (
                        <Square
                            key={`${rowIndex}-${columnIndex}`}
                            value={cell}
                            onSquareClick={useCallback(() => handle(rowIndex, columnIndex), [])}
                            mode={mode}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
    return (
        <div>
            <button onClick={handleModeChange} className='handOver'>切换</button>
            <h1>{GameModel[mode].name}</h1>
            {winner  && (
                <div>
                    <p>{winner === 'X' ? GameModel[mode].GameWinName[0] : GameModel[mode].GameWinName[1]}</p>
                </div>
            )}
            {winner !== 'O' && winner !== 'X' && isBoardFull && <div>平局</div>}
            <div className="board">{renderBoard()}</div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
};
export default Board;
