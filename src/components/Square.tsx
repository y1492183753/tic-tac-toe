import React, { useMemo } from 'react';
import game from '../consts/GameConfig';


type SquareProps = {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
    mode : string;
    isDisable :boolean;
};
/**
 *棋子
 * @param param0
 * @returns
 */
const Square: React.FC<SquareProps> = ({ value, onSquareClick, mode, isDisable }) => {
    const memoizedClasses = useMemo(() => {
        let classNameSquare = '';
        let classNameSquareSpan = '';
        if (mode === 'GoBang') {
            classNameSquare = game.GoBangSquareClass;
            if (value === 'X') {
                classNameSquareSpan = 'XSquare';
            } else if (value === 'O') {
                classNameSquareSpan = 'OSquare';
            } else {
                classNameSquareSpan = game.GoBangSquareClassSpan;
            }
        } else if (mode === 'TicTacToe') {
            classNameSquare = game.TicTacToeSquareClass;
            classNameSquareSpan = game.TicTacToeSquareClassSpan;
        }
        return { classNameSquare, classNameSquareSpan };
    }, [value]); // 依赖于 mode 和 value

    return (
        <button onClick={onSquareClick} className={memoizedClasses.classNameSquare} disabled={isDisable}>
            <span className={memoizedClasses.classNameSquareSpan}>{value}</span>
        </button>
    );
};


export default Square;
