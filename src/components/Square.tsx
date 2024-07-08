import React from 'react';
import GameModel from '../consts/GameModelConfig';

type SquareProps = {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
    mode: number;
};

class Square extends React.Component<SquareProps> {
    /**
     * 棋子样式
     * @returns
     */
    getSquareStyle () {
        switch (this.props.value) {
            case 'X':
                return GameModel[this.props.mode].XSquare;
            case 'O':
                return GameModel[this.props.mode].OSquare;
            default:
                return GameModel[this.props.mode].SquareClassSpan;
        }
    }

    render () {
        const { value, onSquareClick, mode } = this.props;
        const SquareStyle = this.getSquareStyle();

        return (
            <button onClick={onSquareClick} className={GameModel[mode].SquareClass}>
                <span className={SquareStyle}>{value}</span>
            </button>
        );
    }
}

export default Square;
