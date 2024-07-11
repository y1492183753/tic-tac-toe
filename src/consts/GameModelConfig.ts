/**
 * 游戏模型
*/
const GAME_MODEL = [
    {
        /** 游戏模式 */
        mode: 0,
        /** 游戏名 */
        name: 'TicTacToe',
        /** 棋盘大小 */
        size: 3,
        /** 获胜所需的连续棋子数 */
        winCount: 3,
        /** 玩家 */
        player: ['X', 'O'],
    },
    {
        /** 游戏模式 */
        mode: 1,
        /** 游戏名 */
        name: 'GoBang',
        /** 棋盘大小 */
        size: 15,
        /** 获胜所需的连续棋子数 */
        winCount: 5,
        /** 玩家 */
        player: ['黑棋', '白棋'],
    },
];

export default GAME_MODEL;
