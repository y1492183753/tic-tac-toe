import React from 'react';
import GAME_MODEL from '../consts/gameModelConfig';

type SquareProps = {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
    mode: number;
};

class Square extends React.Component<SquareProps> {
    shouldComponentUpdate (nextProps: SquareProps) {
        if (this.props.value !== nextProps.value || this.props.mode !== nextProps.mode) {
            return true;
        }
        return false;
    }
    render () {
        const { value, onSquareClick, mode } = this.props;
        // 渲染棋子组件
        return (
            <button onClick={onSquareClick} className={`${GAME_MODEL[mode].name}-Square`}>
                <span className={`${GAME_MODEL[mode].name}-${value}`}>{value}</span>
            </button>
        );
    }
}

export default Square;
