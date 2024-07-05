import './App.css';
import GameModel from './consts/GameModelConfig';
import React, { useState } from 'react';
import Board from '../src/components/Board';
interface GameProps {
    mode :number;
}
/**
 *App.tsx文件
 * @returns
 */
const App: React.FC = () => {
    /**
     *Game组件
     * @param param0
     * @returns
     */
    const Game: React.FC<GameProps> = ({  mode }) => {
        const size = GameModel[mode].boardSize;
        const [board, setBoard] = useState<(null | 'X' | 'O')[][]>(Array.from({ length: size }, () => Array(size).fill(null)));
        /**
         * 重置棋盘
         */
        const resetGame = () => {
            setBoard(Array.from({ length: size }, () => Array(size).fill(null)));
        };
        return (
            <div className="game">
                <Board currentBoard={board} onReset={resetGame} mode={mode}  />
            </div>
        );
    };
    const [mode, setMode]  = useState(0);
    /**
     * 切换游戏
     */
    const handleModeChange = () => {
        mode === GameModel[0].mode ? setMode(GameModel[1].mode) : setMode(GameModel[0].mode);
    };
    return (
        <div>
            <button onClick={handleModeChange} className='handOver'>切换</button>
            {<Game mode = {mode}/>}
        </div>
    );
};


export default App;
