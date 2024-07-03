import React, { useState } from 'react';
import GoBangBoard from './GoBangBoard';

interface GameProps {
    size: number;
}

/**
 *
 * @param param
 * @returns
 */
const Game: React.FC<GameProps> = ({ size }) => {
    const [winner, setWinner] = useState<'X' | 'O' | null>(null);
    const [board, setBoard] = useState<(null | 'X' | 'O')[][]>(Array.from({ length: size }, () => Array(size).fill(null)));

    /**
     *输出胜者
     * @param winner
     */
    const handleWin = (winner: 'X' | 'O') => {
        let victoryMessage:string = '';
        if (winner === 'X') {
            victoryMessage = '黑棋胜！';
        } else if (winner === 'O') {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            victoryMessage = '白棋胜！';
        }
        setWinner(winner);
    };

    /**
     * 重置游戏状态
     */
    const resetGame = () => {
        setWinner(null);
        setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
    };


    return (
        <div className="game">
            <h1>五子棋游戏</h1>
            {winner && (
                <div className="winner">
                    <p>{winner === 'X' ? '黑棋胜！' : '白棋胜！'}</p>
                </div>
            )}
            <GoBangBoard size={size} currentBoard={board} onWin={handleWin} onReset={resetGame} />
        </div>
    );
};

export default Game;
