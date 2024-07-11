import GAME_MODEL from '../consts/gameModelConfig';
import checkWinner from '../utils/gameOver';
/**
 * 棋盘初始化
 * @param boardSize 棋盘尺寸
 * @returns string[][]
 */
function initBoard (boardSize: number) {
    const rowArr = Array(boardSize).fill(null);
    return rowArr.map(() => rowArr);
}


export interface GoBangState {
    mode: number;
    board: (null | 'X' | 'O')[][];
    history: (null | 'X' | 'O')[][][];
    boardSize: number;
    stepNumber: number;
    xIsNext: boolean;
    lastMove:{ rowIndex: number, columnIndex: number } | null;
    winner: 'X' | 'O' | null;
    isBoardFull: boolean;
    AI: 'X' | 'O' | null;
}


const initialState: GoBangState = {
    mode: 0,
    board: initBoard(GAME_MODEL[0].size),
    boardSize: GAME_MODEL[0].size,
    history: [initBoard(GAME_MODEL[0].size)],
    stepNumber: 0,
    xIsNext: true,
    lastMove: null,
    winner: null,
    isBoardFull: false,
    AI: null,
};

const goBangReducer = (state = initialState, action: any) => {
    if (action.type === 'RESET_BOARD') {
        const { mode } = action;
        const newSize = GAME_MODEL[mode].size;
        const newAI = null;
        return {
            ...state,
            board: initBoard(newSize),
            history: [initBoard(newSize)],
            stepNumber: 0,
            xIsNext: true,
            winner: null,
            isBoardFull: false,
            AI: newAI,
        };
    } else if (action.type === 'MAKE_MOVE') {
        if (state.winner !== null || state.isBoardFull) return state;// 结局已出则不能下棋
        if (state.mode === 0 && state.AI === null) return state;// 先选择AI对战才能下棋 && 井字棋
        const { rowIndex, columnIndex } = action;
        if (state.history[state.stepNumber][rowIndex][columnIndex] !== null) return state;// 下的位置不能有棋子
        const newBoard = JSON.parse(JSON.stringify(state.history[state.stepNumber]));
        newBoard[rowIndex][columnIndex] = state.xIsNext ? 'X' : 'O';
        const newStepNumber = state.stepNumber + 1;
        const newIsBoardFull = state.stepNumber === ((state.boardSize * state.boardSize) - 1);
        const newWinner = checkWinner(rowIndex, columnIndex, state.mode, newBoard);
        return {
            ...state,
            board: newBoard,
            history: [...state.history, newBoard],
            stepNumber: newStepNumber,
            xIsNext: !state.xIsNext,
            lastMove: { rowIndex, columnIndex },
            isBoardFull: newIsBoardFull,
            winner: newWinner,
        };
    } else if (action.type === 'JUMP_TO') {
        const { step } = action;
        if (step < 0 || step >= state.history.length) return state;
        return {
            ...state,
            board: state.history[step],
            history: state.history.slice(0, step + 1),
            stepNumber: step,
            xIsNext: step % 2 === 0,
            winner: null,
            isBoardFull: false,
        };
    } else if (action.type === 'CHANGE_MODE') {
        const gameMode = state.mode === 1 ? 0 : 1;
        return {
            mode: gameMode,
            board: initBoard(GAME_MODEL[gameMode].size),
            boardSize: GAME_MODEL[gameMode].size,
            history: [initBoard(GAME_MODEL[gameMode].size)],
            stepNumber: 0,
            xIsNext: true,
            lastMove: null,
            winner: null,
            isBoardFull: false,
            AI: null,
        };
    } else if (action.type === 'CHOOSE_AI') {
        const { square } = action;
        return {
            ...state,
            AI: square,
        };
    }
    return state;
};


export default goBangReducer;
