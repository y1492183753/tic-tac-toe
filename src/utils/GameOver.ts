import GameModel from '../consts/GameModelConfig';
/**
 *判断胜负
 * @param rowIndex
 * @param columnIndex
 * @param mode
 * @param board
 * @returns
 */
const checkWinner = (rowIndex: number, columnIndex: number, mode:number, board: ('X' | 'O' | null)[][], onWin?: (winner: 'X' | 'O') => void) => {
    const currentPlayer = board[rowIndex][columnIndex];
    if (currentPlayer === null) return null; // 如果该位置是空的，则不进行检查

    // 检查四个方向的五子连线
    if (checkLine(rowIndex, columnIndex, 0, 1, board, mode) || // 水平方向
    checkLine(rowIndex, columnIndex, 1, 0, board, mode) || // 垂直方向
    checkLine(rowIndex, columnIndex, 1, 1, board, mode) || // 左斜方向
    checkLine(rowIndex, columnIndex, 1, -1, board, mode)) { // 右斜方向
        onWin?.(currentPlayer);
        return currentPlayer;
    }
    return null;
};
/**
 *检查连线
 * @param startX
 * @param startY
 * @param stepX
 * @param stepY
 * @param size
 * @param board
 * @returns
 */
const checkLine = (startX: number, startY: number, stepX: number, stepY: number,  board: ('X' | 'O' | null)[][], mode:number) => {
    let count = 0;
    let currentX = startX;
    let currentY = startY;
    const thisSize = GameModel[mode].size;
    // 检查向前方向
    while (currentX >= 0 && currentX < thisSize && currentY >= 0 && currentY < thisSize && board[currentX][currentY] === board[startX][startY]) {
        count++;
        currentX += stepX;
        currentY += stepY;
    }
    // 检查向后方向
    currentX = startX - stepX;
    currentY = startY - stepY;
    while (currentX >= 0 && currentX < thisSize && currentY >= 0 && currentY < thisSize && board[currentX][currentY] === board[startX][startY]) {
        count++;
        currentX -= stepX;
        currentY -= stepY;
    }
    // 返回是否有五子连线
    return count >= GameModel[mode].winCount;
};


export default checkWinner;
