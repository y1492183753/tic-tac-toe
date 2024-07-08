import './App.css';
import React from 'react';
import Board from '../src/components/Board';
import { useSelector } from 'react-redux';
import type { GoBangState } from './store/index';
/**
 *App组件
 * @returns
 */
const App: React.FC = () => {
    const mode = useSelector((state: GoBangState) => state.mode);
    return (
        <div>
            <Board mode={mode} />
        </div>
    );
};

export default App;
