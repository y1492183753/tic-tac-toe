import game from '../consts/GameConfig';

/**
 *判断胜负
 * @param rowIndex
 * @param columnIndex
 * @param size
 * @param board
 * @param onWin
 * @returns
 */
const checkWinner = (rowIndex: number, columnIndex: number, size:number, board: ('X' | 'O' | null)[][], onWin: (winner: 'X' | 'O') => void) => {
    const currentPlayer = board[rowIndex][columnIndex];
    if (currentPlayer === null) return; // 如果该位置是空的，则不进行检查

    // 检查四个方向的五子连线
    if (checkLine(rowIndex, columnIndex, 0, 1, size, board) || // 水平方向
    checkLine(rowIndex, columnIndex, 1, 0, size, board) || // 垂直方向
    checkLine(rowIndex, columnIndex, 1, 1, size, board) || // 左斜方向
    checkLine(rowIndex, columnIndex, 1, -1, size, board)) { // 右斜方向
        onWin?.(currentPlayer);
        return;
    }
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
const checkLine = (startX: number, startY: number, stepX: number, stepY: number, size:number, board: ('X' | 'O' | null)[][]) => {
    let count = 0;
    let currentX = startX;
    let currentY = startY;
    let over = 0;
    if (size === game.GoBangBoardWidth) {
        over = 5;
    }
    if (size === game.TicTacToeBoardWidth) {
        over = 3;
    }
    // 检查向前方向
    while (currentX >= 0 && currentX < size && currentY >= 0 && currentY < size && board[currentX][currentY] === board[startX][startY]) {
        count++;
        currentX += stepX;
        currentY += stepY;
    }

    // 检查向后方向
    currentX = startX - stepX;
    currentY = startY - stepY;
    while (currentX >= 0 && currentX < size && currentY >= 0 && currentY < size && board[currentX][currentY] === board[startX][startY]) {
        count++;
        currentX -= stepX;
        currentY -= stepY;
    }

    // 返回是否有五子连线
    return count >= over;
};


export default checkWinner;
