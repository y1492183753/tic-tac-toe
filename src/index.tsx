import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

// 渲染 App 组件
root.render(<Provider store={store}>
    <App />
</Provider>);


