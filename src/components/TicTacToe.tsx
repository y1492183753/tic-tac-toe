import React, { useState } from 'react';
import Board from './TicTacToeBoard';


type GameProps = {};

/**
 *
 * @returns
 */
const Game: React.FC<GameProps> = () => {
    const [history, setHistory] = useState<('X' | 'O' | null)[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    /**
     *历史记录和步数
     * @param nextSquares
     */
    const handlePlay = (nextSquares: ('X' | 'O' | null)[]) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    /**
     *跳跃
     * @param nextMove
     */
    const jumpTo = (nextMove: number) => {
        setCurrentMove(nextMove);
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
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>

        </div>
    );
};


export default Game;
