import React, { useEffect, useState } from 'react';
import Square from './Square';
import checkWinner from '../utils/GameOver';
import GameModel from '../consts/GameModelConfig';
interface GoBangBoardProps {
    currentBoard: (null | 'X' | 'O')[][];
    onReset?: () => void;
    mode: number;
}
/**
 *棋盘
 * @param param0
 * @returns
 */
const Board: React.FC<GoBangBoardProps> = ({  onReset, mode }) => {
    const size = GameModel[mode].boardSize;
    const [board, setBoard] = useState<(null | 'X' | 'O')[][]>(Array.from({ length: size }, () => Array(size).fill(null)));
    const [history, setHistory] = useState<(null | 'X' | 'O')[][][]>([board]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [lastMove, setLastMove] = useState<{ rowIndex: number, columnIndex: number } | null>(null);
    const [winner, setWinner] = useState<'X' | 'O' | null>(null);
    const [isBoardFull, setIsBoardFull] = useState(false);
    /**
     *下棋
     * @param rowIndex
     * @param columnIndex
     * @returns
     */
    const handleClick = (rowIndex: number, columnIndex: number) => {
        // 检查游戏是否已经结束
        if (winner === 'X' || winner === 'O') return;
        // 检查当前位置是否已被占用
        if (history[stepNumber][rowIndex][columnIndex] !== null) return;
        // 平局判断
        if (stepNumber === (size * size) - 1) {
            setIsBoardFull(true);
        }
        // 更新
        updateBoard(rowIndex, columnIndex);
    };

    /**
     *更新处理
     * @param rowIndex
     * @param columnIndex
     */
    const updateBoard = (rowIndex: number, columnIndex: number) => {
        // 获取当前棋盘并进行深拷贝
        const newBoard = JSON.parse(JSON.stringify(history[stepNumber]));
        newBoard[rowIndex][columnIndex] = xIsNext ? 'X' : 'O'; // 更新落子位置
        // 更新历史记录和当前棋盘状态\
        setHistory([...history, newBoard]);
        setBoard(newBoard);
        // 更新步数和当前玩家
        setStepNumber(stepNumber + 1);
        setXIsNext(!xIsNext);
        // 检查获胜者
        checkWinner(rowIndex, columnIndex, mode, newBoard, handleWin);
    };

    /**
     *输出胜者
     * @param winner
     */
    const handleWin = (winner: 'X' | 'O') => {
        setWinner(winner);
    };

    /**
     *Square绑定的点击事件“入口”
     */
    const handle = (rowIndex: number, columnIndex: number) => {
        setLastMove({ rowIndex, columnIndex });
    };

    // 自执行handleClick
    useEffect(() => {
        if (lastMove) {
            handleClick(lastMove.rowIndex, lastMove.columnIndex);
        }
    }, [lastMove]);
    /**
     * 重置棋盘
     */
    const resetBoard = () => {
        // 空棋盘
        const newBoard: (null | 'X' | 'O')[][] = Array.from({ length: size }, () => Array(size).fill(null));
        setHistory([newBoard]);
        setBoard(newBoard);
        setStepNumber(0);
        setXIsNext(true);
        onReset?.();
    };
    /**
     *跳转
     * @param step
     */
    const jumpTo = (step: number) => {
        if (step > 0 && step < history.length) {
            const newHistory = history.slice(0, step + 1);
            setBoard(history[step]);
            setStepNumber(step);
            setXIsNext(step % 2 === 0);
            setHistory(newHistory);
            setWinner(null);
            setIsBoardFull(false);
        } else {
            setIsBoardFull(false);
            resetBoard();
        }
    };
    // 渲染跳转按钮，只有当 stepNumber 小于等于当前步骤时才渲染
    const moves = history.map((__, move) => {
        if (move > stepNumber) {
            // 如果当前步骤大于 move，不渲染这个按钮
            return null;
        }
        const description = move > 0 ? `Go to move #${move}` : 'Start over';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)} key={move}>
                    {description}
                </button>
            </li>
        );
    }).filter(Boolean);

    /**
     *渲染棋盘
     * @returns
     */
    const renderBoard = () => {
        return board.map((row, rowIndex) => (
            <div key={rowIndex} className={GameModel[mode].name}>
                {row.map((cell, columnIndex) => (
                    <Square
                        key={`${rowIndex}-${columnIndex}`} // 使用行索引和列索引组合作为key
                        value={cell}
                        onSquareClick={React.useCallback(() => handle(rowIndex, columnIndex), [])}
                        mode={mode}
                    />
                ))}
            </div>
        ));
    };


    return (
        <div>
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
