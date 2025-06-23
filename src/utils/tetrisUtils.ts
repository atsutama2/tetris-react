import { Board, Tetromino, TetrominoShape } from '../types/tetris';
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINO_SHAPES } from '../constants/tetrominos';

// 空のボードを作成
export const createEmptyBoard = (): Board => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
};

// ランダムなテトリミノを生成
export const createRandomTetromino = (): Tetromino => {
  const types: Array<keyof typeof TETROMINO_SHAPES> = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  return {
    type: randomType,
    shape: TETROMINO_SHAPES[randomType],
    position: { x: 3, y: 0 }
  };
};

// テトリミノを回転
export const rotateTetromino = (shape: TetrominoShape): TetrominoShape => {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: TetrominoShape = Array(cols).fill(null).map(() => Array(rows).fill(false));
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = shape[i][j];
    }
  }
  
  return rotated;
};

// 位置が有効かチェック
export const isValidPosition = (
  tetromino: Tetromino,
  board: Board
): boolean => {
  const { shape, position } = tetromino;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardX = position.x + x;
        const boardY = position.y + y;
        
        // ボードの外に出ているかチェック
        if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
          return false;
        }
        
        // 既にブロックがあるかチェック
        if (boardY >= 0 && board[boardY][boardX] !== null) {
          return false;
        }
      }
    }
  }
  
  return true;
};

// テトリミノをボードに配置
export const placeTetromino = (tetromino: Tetromino, board: Board): Board => {
  const newBoard = board.map(row => [...row]);
  const { shape, position, type } = tetromino;
  
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardX = position.x + x;
        const boardY = position.y + y;
        
        if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
          newBoard[boardY][boardX] = type;
        }
      }
    }
  }
  
  return newBoard;
};

// 完成した行を削除
export const clearCompletedLines = (board: Board): { board: Board; linesCleared: number } => {
  let linesCleared = 0;
  let newBoard = board.map(row => [...row]);
  
  for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
    if (newBoard[y].every(cell => cell !== null)) {
      newBoard.splice(y, 1);
      newBoard.unshift(Array(BOARD_WIDTH).fill(null));
      linesCleared++;
      y++; // 同じ行をもう一度チェック
    }
  }
  
  return { board: newBoard, linesCleared };
};

// ゲームオーバーかチェック
export const isGameOver = (board: Board): boolean => {
  return board[0].some(cell => cell !== null);
}; 