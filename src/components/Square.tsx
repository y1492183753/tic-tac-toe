import React from 'react';
import GameModel from '../consts/GameModelConfig';

type SquareProps = {
    value: 'X' | 'O' | null;
    onSquareClick: () => void;
    mode: number;
};

class Square extends React.Component<SquareProps> {
    // 检查是否需要更新组件
    shouldComponentUpdate (nextProps: SquareProps) {
    // 比较当前 props 和下一个 props
    // 如果 value 或 mode 发生变化，则返回 true 以重新渲染
        if (this.props.value !== nextProps.value || this.props.mode !== nextProps.mode) {
            return true;
        }
        // 如果其他 props 没有变化，返回 false 以避免重新渲染
        return false;
    }

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
        console.warn(1);
        // 渲染棋子组件
        return (
            <button onClick={onSquareClick} className={GameModel[mode].SquareClass}>
                <span className={SquareStyle}>{value}</span>
            </button>
        );
    }
}

export default Square;
