import React, { useEffect, useState } from 'react';
import Square from './Square';
import checkWinner from '../utils/GameOver';

interface GoBangBoardProps {
    size: number;
    currentBoard: (null | 'X' | 'O')[][];
    onWin: (winner: 'X' | 'O') => void;
    onReset?: () => void;
    mode: string;
    isDisable: boolean;
}

/**
 *棋盘
 * @param param0
 * @returns
 */
const Board: React.FC<GoBangBoardProps> = ({ size, onWin, onReset, mode, isDisable }) => {
    const [board, setBoard] = useState<(null | 'X' | 'O')[][]>(Array.from({ length: size }, () => Array(size).fill(null)));
    const [history, setHistory] = useState<(null | 'X' | 'O')[][][]>([board]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [lastMove, setLastMove] = useState<{ rowIndex: number, columnIndex: number } | null>(null);
    const [isBoardFull, setisBoardFull] = useState(false);

    // 自动执行 checkWinner 函数
    useEffect(() => {
        if (lastMove) {
            checkWinner(lastMove.rowIndex, lastMove.columnIndex, size, board, onWin);
        }
    }, [lastMove]);
    /**
     *下棋
     * @param rowIndex
     * @param columnIndex
     * @returns
     */
    const handleClick = (rowIndex: number, columnIndex: number) => {
        const currentBoard = history[stepNumber];
        if (currentBoard[rowIndex][columnIndex] !== null) return;
        // 创建一个新的历史记录，深拷贝当前棋盘，并更新落子位置
        const updatedHistory = [...history, currentBoard.map((row, currentRowIndex) =>
            (currentRowIndex === rowIndex ? row.map((cell, currentColumnIndex) => {
                if (currentColumnIndex === columnIndex) {
                    return xIsNext ? 'X' : 'O';
                }
                return cell;
            }) : row))];

        // 更新历史记录
        setHistory(updatedHistory);
        // 平局判断
        if (stepNumber === (size * size) - 1) {
            setisBoardFull(true);
        }
        // 更新当前棋盘的落子位置
        setBoard((prevBoard) => {
            const newBoard = prevBoard.map((row, index) => {
                if (index === rowIndex) {
                    return row.map((cell, Index) => {
                        if (Index === columnIndex) {
                            return xIsNext ? 'X' : 'O';
                        }
                        return cell;
                    });
                }
                return row;
            });
            return newBoard;
        });
        // 更新步数和当前玩家
        setStepNumber(history.length);
        setXIsNext(!xIsNext);
        setLastMove({ rowIndex, columnIndex });
    };


    /**
     *渲染棋盘
     * @returns
     */
    const renderBoard = () => {
        return board.map((row, rowIndex) => (
            <div key={rowIndex} className={mode}>
                {row.map((cell, columnIndex) => (
                    <Square
                        key={`${rowIndex}-${columnIndex}`} // 使用行索引和列索引组合作为key
                        value={cell}
                        onSquareClick={() => handleClick(rowIndex, columnIndex)}
                        mode={mode}
                        isDisable={isDisable}
                    />
                ))}
            </div>
        ));
    };


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
            setBoard(history[step]);
            setStepNumber(step);
            setXIsNext(step % 2 === 0);
        } else {
            resetBoard();
        }
    };

    const moves = history.map((squares, move) => {
        let description: string;
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = '重新开始';
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <div>
            {isBoardFull && <div>平局</div>}
            <div className="board">{renderBoard()}</div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
};


export default Board;


