
import React from 'react';
import '../styles/GoBangSquare.css';

interface SquareProps {
    value: 'X' | 'O' | null;
    onClick: () => void;
}
/**
 *棋子
 * @param param0
 * @returns
 */
const Square: React.FC<SquareProps> = ({ value, onClick }) => {
    return (
        <button className="gobang-square" onClick={onClick}>
            {value === 'X' && <span className="x">X</span>}
            {value === 'O' && <span className="o">O</span>}
        </button>
    );
};

export default Square;
