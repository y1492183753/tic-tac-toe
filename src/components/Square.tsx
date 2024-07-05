import React from 'react';
import GameModel from '../consts/GameModelConfig';


type SquareProps = {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
    mode : number;
};
/**
 *棋子
 * @param param0
 * @returns
 */
const Square: React.FC<SquareProps> = React.memo(({ value, onSquareClick, mode }) => {
    let SquareStyle = GameModel[mode].SquareClassSpan;
    if (value === 'X') {
        SquareStyle = GameModel[mode].XSquare;
    }
    if (value === 'O') {
        SquareStyle = GameModel[mode].OSquare;
    }
    return (
        <button onClick={onSquareClick} className={GameModel[mode].SquareClass} >
            <span className={SquareStyle}>{value}</span>
        </button>
    );
});

export default Square;
