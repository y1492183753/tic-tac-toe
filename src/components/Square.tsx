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
    /**
     *棋子样式
     * @returns
     */
    const getSquareStyle = () => {
        switch (value) {
            case 'X':
                return GameModel[mode].XSquare;
            case 'O':
                return GameModel[mode].OSquare;
            default:
                return GameModel[mode].SquareClassSpan;
        }
    };
    const SquareStyle = getSquareStyle();

    return (
        <button onClick={onSquareClick} className={GameModel[mode].SquareClass}>
            <span className={SquareStyle}>{value}</span>
        </button>
    );
});

export default Square;
