type Board = ('X' | 'O' | null)[][];

const HUMAN = -1;
const COMP = +1;
/**
 *AI下棋
 * @param board
 * @param aiPlayer
 * @param chess
 * @returns
 */
export default function clickForAI (board: Board, aiPlayer: 'X' | 'O', chess: string[]): number[] | false {
    const digitalBoard = setDigitalForBoard(board, aiPlayer, aiPlayer, chess);
    const emptySquares = getEmptySquare(digitalBoard);

    if (emptySquares.length === 0) {
        return false;
    }

    const bestMove = getBestMove(digitalBoard, COMP);
    return bestMove;
}
/**
 * 拿到最佳坐标
 * @param digitalBoard
 * @param player
 * @returns
 */
function getBestMove (digitalBoard: number[][], player: number): number[] {
    let bestScore = player === COMP ? -Infinity : Infinity;
    let bestMove: number[] = [];

    getEmptySquare(digitalBoard).forEach((coordinate) => {
        const [xAxis, yAxis] = coordinate;
        digitalBoard[xAxis][yAxis] = player;
        const score = minimax(digitalBoard, player === COMP ? -Infinity : Infinity, player === COMP ? Infinity : -Infinity, player === COMP ? HUMAN : COMP);
        digitalBoard[xAxis][yAxis] = 0;

        if (player === COMP && score > bestScore) {
            bestScore = score;
            bestMove = [xAxis, yAxis];
        } else if (player === HUMAN && score < bestScore) {
            bestScore = score;
            bestMove = [xAxis, yAxis];
        }
    });

    return bestMove;
}
/**
 * 极小化极大算法
 * @param digitalBoard
 * @param alpha
 * @param beta
 * @param player
 * @returns
 */
function minimax (digitalBoard: number[][], alpha: number, beta: number, player: number): number {
    if (checkWin(digitalBoard, COMP)) return 10;
    if (checkWin(digitalBoard, HUMAN)) return -10;
    if (isBoardFull(digitalBoard)) return 0;

    if (player === COMP) {
        let bestScore = -Infinity;
        getEmptySquare(digitalBoard).forEach((coordinate) => {
            const [xAxis, yAxis] = coordinate;
            digitalBoard[xAxis][yAxis] = COMP;
            bestScore = Math.max(bestScore, minimax(digitalBoard, alpha, beta, HUMAN));
            digitalBoard[xAxis][yAxis] = 0;
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) return;
        });
        return bestScore;
    }
    let bestScore = Infinity;
    getEmptySquare(digitalBoard).forEach((coordinate) => {
        const [xAxis, yAxis] = coordinate;
        digitalBoard[xAxis][yAxis] = HUMAN;
        bestScore = Math.min(bestScore, minimax(digitalBoard, alpha, beta, COMP));
        digitalBoard[xAxis][yAxis] = 0;
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) return;
    });
    return bestScore;
}

/**
 * 检查是否获胜
 * @param digitalBoard
 * @param player
 * @returns
 */
function checkWin (digitalBoard: number[][], player: number): boolean {
    // 检查所有可能的获胜方向：水平、垂直、对角线
    for (let row = 0; row < 3; row++) {
        // 检查水平方向
        if (digitalBoard[row][0] === player && digitalBoard[row][1] === player && digitalBoard[row][2] === player) {
            return true;
        }
        // 检查垂直方向
        if (digitalBoard[0][row] === player && digitalBoard[1][row] === player && digitalBoard[2][row] === player) {
            return true;
        }
    }
    // 检查对角线方向
    if ((digitalBoard[0][0] === player && digitalBoard[1][1] === player && digitalBoard[2][2] === player) ||
        (digitalBoard[0][2] === player && digitalBoard[1][1] === player && digitalBoard[2][0] === player)) {
        return true;
    }
    return false;
}

/**
 * 是否下满
 * @param digitalBoard
 * @returns
 */
function isBoardFull (digitalBoard: number[][]): boolean {
    return digitalBoard.every(row => row.every(cell => cell !== 0));
}

/**
 * 棋盘数值化处理
 * @param board
 * @param aiPlayer
 * @param activeUser
 * @param chess
 * @returns
 */
function setDigitalForBoard (board: Board, aiPlayer: 'X' | 'O', activeUser: string, chess: string[]): number[][] {
    const digitalBoard: number[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
        const row: number[] = [];
        for (let colIndex = 0; colIndex < 3; colIndex++) {
            if (board[rowIndex][colIndex] === chess[0]) {
                row.push(activeUser === chess[0] ? COMP : HUMAN);
            } else if (board[rowIndex][colIndex] === chess[1]) {
                row.push(activeUser === chess[0] ? HUMAN : COMP);
            } else {
                row.push(0);
            }
        }
        digitalBoard.push(row);
    }
    return digitalBoard;
}

/**
 * 获取空格坐标组
 * @param digitalBoard
 * @returns
 */
function getEmptySquare (digitalBoard: number[][]): number[][] {
    const emptySquares: number[][] = [];
    digitalBoard.forEach((item, row) => {
        item.forEach((value, col) => {
            if (value === 0) {
                emptySquares.push([row, col]);
            }
        });
    });
    return emptySquares;
}
