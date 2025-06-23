// テトリミノの種類
export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

// セルの状態
export type CellState = TetrominoType | null;

// ゲームボード（2次元配列）
export type Board = CellState[][];

// テトリミノの位置
export interface Position {
  x: number;
  y: number;
}

// テトリミノの形状（2次元配列）
export type TetrominoShape = boolean[][];

// テトリミノの状態
export interface Tetromino {
  type: TetrominoType;
  shape: TetrominoShape;
  position: Position;
}

// ゲームの状態
export interface GameState {
  board: Board;
  currentTetromino: Tetromino | null;
  nextTetromino: Tetromino | null;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
  isPaused: boolean;
}

// ゲームのアクション
export type GameAction = 
  | { type: 'MOVE_LEFT' }
  | { type: 'MOVE_RIGHT' }
  | { type: 'MOVE_DOWN' }
  | { type: 'ROTATE' }
  | { type: 'DROP' }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART' }; 