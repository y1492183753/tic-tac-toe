// src/store/actions.ts
export const RESET_BOARD = 'RESET_BOARD';
export const MAKE_MOVE = 'MAKE_MOVE';
export const JUMP_TO = 'JUMP_TO';
export const CHANGE_MODE = 'CHANGE_MODE';

/**
 *下棋Action
 * @param rowIndex
 * @param columnIndex
 * @returns
 */
export const makeMove = (rowIndex: number, columnIndex: number) => ({
    type: MAKE_MOVE,
    rowIndex,
    columnIndex,
});
/**
 *跳转Action
 * @param step
 * @returns
 */
export const jumpTo = (step: number) => ({
    type: JUMP_TO,
    step,
});
/**
 *重置棋盘Action
 * @param mode
 * @returns
 */
export const resetBoard = (mode: number) => ({
    type: RESET_BOARD,
    mode,
});
/**
 *切换Action
 * @returns
 */
export const changeMode = () => ({ type: CHANGE_MODE });
