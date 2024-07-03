
import React, { useState, useEffect } from 'react';
import Square from './GoBangSquare';
import '../styles/GoBangBoard.css';

interface GoBangBoardProps {
    size: number;
    currentBoard: (null | 'X' | 'O')[][];
    onWin: (winner: 'X' | 'O') => void;
    onReset?: () => void;
}
/**
 *
 * @param param0
 * @returns
 */
const GoBangBoard: React.FC<GoBangBoardProps> = ({ size, onWin, onReset }) => {
    const [board, setBoard] = useState<(null | 'X' | 'O')[][]>(Array.from({ length: size }, () => Array(size).fill(null)));
    const [history, setHistory] = useState<(null | 'X' | 'O')[][][]>([board]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    // 自动执行 checkWinner 函数
    useEffect(() => {
        checkWinner();
    }, [board]);

    /**
 * 下棋并更新状态
 * @param rowIndex 行索引
 * @param columnIndex 列索引
 * @returns
 */
    const handleClick = (rowIndex: number, columnIndex: number) => {
        const historyPoint = history[stepNumber];
        if (historyPoint[rowIndex][columnIndex] !== null) return;

        const newBoard = historyPoint.map((row, historyRowIndex) => {
            if (historyRowIndex === rowIndex) {
                return row.map((cell, cellIndex) => {
                    if (cellIndex === columnIndex) {
                        return xIsNext ? 'X' : 'O';
                    }
                    return cell;
                });
            }
            return row;
        });

        setHistory([...history, newBoard]);
        setBoard(newBoard);
        setStepNumber(history.length);
        setXIsNext(!xIsNext);
    };


    /**
 * 胜负
 * @returns
 */
    const checkWinner = () => {
        const currentPlayer = xIsNext ? 'O' : 'X';
        for (let rowIndex = 0; rowIndex < size; rowIndex++) {
            for (let columnIndex = 0; columnIndex < size; columnIndex++) {
                if (board[rowIndex][columnIndex] === currentPlayer) {
                    if (checkLine(rowIndex, columnIndex, 0, 1) ||
              checkLine(rowIndex, columnIndex, 1, 0) ||
              checkLine(rowIndex, columnIndex, 1, 1) ||
              checkLine(rowIndex, columnIndex, 1, -1)) {
                        onWin?.(currentPlayer);
                        return;
                    }
                }
            }
        }
    };


    /**
 * 检查五子连线
 * @param startX 起始行索引
 * @param startY 起始列索引
 * @param stepX X方向的步长
 * @param stepY Y方向的步长
 * @returns
 */
    const checkLine = (startX: number, startY: number, stepX: number, stepY: number) => {
        let count = 1;
        let currentX = startX + stepX;
        let currentY = startY + stepY;
        // 检查向前方向
        while (currentX >= 0 && currentX < size && currentY >= 0 && currentY < size && board[currentX][currentY] === board[startX][startY]) {
            count++;
            currentX += stepX;
            currentY += stepY;
        }
        currentX = startX - stepX;
        currentY = startY - stepY;
        // 检查向后方向
        while (currentX >= 0 && currentX < size && currentY >= 0 && currentY < size && board[currentX][currentY] === board[startX][startY]) {
            count++;
            currentX -= stepX;
            currentY -= stepY;
        }
        return count >= 5;
    };


    /**
     *渲染棋盘
     * @returns
     */
    const renderBoard = () => {
        return board.map((row, rowIndex) => (
            <div key={rowIndex} className="board-row">
                {row.map((cell, columnIndex) => (
                    <Square key={columnIndex} value={cell} onClick={() => handleClick(rowIndex, columnIndex)} />
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
     *返回
     * @param step
     */
    const jumpTo = (step: number) => {
        if (step > 0 && step < history.length) {
            setBoard(history[step]);
            setStepNumber(step);
            setXIsNext(step % 2 === 0);
        }
    };

    return (
        <div>
            <div className="gomoku-board">{renderBoard()}</div>
            <button onClick={() => jumpTo(stepNumber - 1)} disabled={stepNumber === 0 || stepNumber === 1}>
        上一步
            </button>
            <button onClick={resetBoard}>
        重新开始
            </button>
        </div>
    );
};

export default GoBangBoard;
