import './App.css';
import game from './consts/GameConfig';
import React, { useState } from 'react';
import Board from '../src/components/Board';

interface GameProps {
    size: number;
    mode :string;
}

/**
 *
 * @returns
 */
const App: React.FC = () => {
    /**
     *Game
     * @param param0
     * @returns
     */
    const Game: React.FC<GameProps> = ({ size, mode }) => {
        const [winner, setWinner] = useState<'X' | 'O' | null>(null);
        const [board, setBoard] = useState<(null | 'X' | 'O')[][]>(Array.from({ length: size }, () => Array(size).fill(null)));
        /**
         *输出胜者
         * @param winner
         */
        const handleWin = (winner: 'X' | 'O') => {
            setWinner(winner);
        };
        /**
         * 重置棋盘
         */
        const resetGame = () => {
            setWinner(null);
            setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
        };
        return (
            <div className="game">
                {winner && size === game.GoBangBoardWidth && (
                    <div className="winner">
                        <p>{winner === 'X' ? '黑棋胜！' : '白棋胜！'}</p>
                    </div>
                )}
                {winner && size === game.TicTacToeBoardWidth && (
                    <div className="winner">
                        <p>{winner === 'X' ? 'X胜!' : 'O胜!'}</p>
                    </div>
                )}
                <Board size={size} currentBoard={board} onWin={handleWin} onReset={resetGame} mode={mode}  isDisable={winner !== null}/>
            </div>
        );
    };


    const [currentGame, setCurrentGame] = useState<'TicTacToe' | 'GoBang'>('TicTacToe');
    /**
     * 切换游戏
     */
    const handleModeChange = () => {
        setCurrentGame(currentGame === 'TicTacToe' ? 'GoBang' : 'TicTacToe');
    };

    return (
        <div>
            <button onClick={handleModeChange} className='handOver'>切换</button>
            {currentGame === 'TicTacToe' && <h1>TicTacToe</h1>}
            {currentGame === 'TicTacToe' && <Game size={game.TicTacToeBoardWidth} mode = {game.TicTacToe}/>}
            {currentGame === 'GoBang' && <h1>GoBang</h1>}
            {currentGame === 'GoBang' && <Game size={game.GoBangBoardWidth} mode={game.GoBang}/>}
        </div>
    );
};

export default App;

