import React from 'react';

type SquareProps = {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
};
/**
 *棋子
 * @param param0
 * @returns
 */
const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
};

export default Square;
