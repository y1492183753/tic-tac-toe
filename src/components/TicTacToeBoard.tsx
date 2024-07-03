import React from 'react';
import Square from './TicTacToeSquare';


type BoardProps = {
    xIsNext: boolean;
    squares: ('X' | 'O' | null)[];
    onPlay: (nextSquares: ('X' | 'O' | null)[]) => void;
};
/**
 *
 * @param param0
 * @returns
 */
const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay }) => {
    let Adraw: number = 1;// 用于判断平局
    for (let index = 0; index < squares.length; index++) {
        if (squares[index] === null) {
            Adraw = 0;
        }
    }

    /**
     *下棋
     * @param index
     * @returns
     */
    const handleClick = (index: number) => {
        if (calculateWinner(squares) || squares[index]) {
            return;
        }
        const nextSquares = [...squares];
        nextSquares[index] = xIsNext ? 'X' : 'O';
        onPlay(nextSquares);
    };
    // 结果
    const winner = calculateWinner(squares);
    let status: string;
    if (winner) {
        status = `胜利者是: ${winner}`;
    } else if (Adraw === 1) {
        status = '平局！！！';
    } else {
        status = `下一步轮到: ${xIsNext ? 'X' : 'O'}`;
    }


    /**
    *计算胜负
    * @param squares
    * @returns
    */
    function calculateWinner (squares: ('X' | 'O' | null)[]): 'X' | 'O' | null {
        const winningLines = [
            [0, 1, 2], // 第一行
            [3, 4, 5], // 第二行
            [6, 7, 8], // 第三行
            [0, 3, 6], // 第一列
            [1, 4, 7], // 第二列
            [2, 5, 8], // 第三列
            [0, 4, 8], // 对角线
            [2, 4, 6], // 对角线
        ];

        for (let lineIndex = 0; lineIndex < winningLines.length; lineIndex++) {
            const [first, second, third] = winningLines[lineIndex];
            if (squares[first] && squares[first] === squares[second] && squares[first] === squares[third]) {
                return squares[first];
            }
        }
        return null;
    }


    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {squares.map((value, index) => (
                    <Square key={index} value={value} onSquareClick={() => handleClick(index)} />
                ))}
            </div>
        </>
    );
};

export default Board;
