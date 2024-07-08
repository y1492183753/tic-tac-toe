import './App.css';
import React from 'react';
import Board from '../src/components/Board';
import { connect } from 'react-redux';
import type { GoBangState } from './store/index';

interface AppProps {
    mode: number;
}

class App extends React.Component<AppProps> {
    render () {
        const { mode } = this.props;
        return (
            <div>
                <Board mode={mode} />
            </div>
        );
    }
}
/**
 *提取 mode 状态
 * @param state
 * @returns
 */
const mapStateToProps = (state: GoBangState) => ({ mode: state.mode });

// 使用 connect 函数来连接组件和 Redux store
export default connect(mapStateToProps)(App);
