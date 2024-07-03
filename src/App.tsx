import TicTacToe from './components/TicTacToe';
import GoBang from './components/GoBang';
import './App.css';
import React, { useState } from 'react';

/**
 *
 * @returns
 */
const GameComponent: React.FC = () => {
    const [mode, setMode] = useState<string>('TicTacToe');

    /**
     * 切换
     */
    const handleModeChange = () => {
        setMode((currentMode) => (currentMode === 'TicTacToe' ? 'GoBang' : 'TicTacToe'));
    };

    const shouldRenderTicTacToe = mode === 'TicTacToe';
    const shouldRenderGoBang = mode === 'GoBang';


    return (
        <div>

            <button onClick={handleModeChange} className='handOver'>
      切换
            </button>
            {shouldRenderTicTacToe && <TicTacToe />}
            { shouldRenderGoBang   && <GoBang size={18} />}

        </div>
    );
};

export default GameComponent;

