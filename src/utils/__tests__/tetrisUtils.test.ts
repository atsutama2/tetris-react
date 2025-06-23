import {
  createEmptyBoard,
  createRandomTetromino,
  rotateTetromino,
  isValidPosition,
  placeTetromino,
  clearCompletedLines,
  isGameOver,
} from '../tetrisUtils';
import { BOARD_WIDTH, BOARD_HEIGHT, TETROMINO_SHAPES } from '../../constants/tetrominos';

describe('tetrisUtils', () => {
  describe('createEmptyBoard', () => {
    it('正しいサイズの空のボードを作成する', () => {
      const board = createEmptyBoard();
      
      expect(board).toHaveLength(BOARD_HEIGHT);
      expect(board[0]).toHaveLength(BOARD_WIDTH);
      expect(board.every(row => row.every(cell => cell === null))).toBe(true);
    });
  });

  describe('createRandomTetromino', () => {
    it('ランダムなテトリミノを生成する', () => {
      const tetromino = createRandomTetromino();
      
      expect(tetromino).toHaveProperty('type');
      expect(tetromino).toHaveProperty('shape');
      expect(tetromino).toHaveProperty('position');
      expect(tetromino.position).toEqual({ x: 3, y: 0 });
      expect(TETROMINO_SHAPES[tetromino.type]).toEqual(tetromino.shape);
    });
  });

  describe('rotateTetromino', () => {
    it('テトリミノを正しく回転する', () => {
      const originalShape = [
        [true, true],
        [false, true],
      ];
      
      const rotated = rotateTetromino(originalShape);
      
      expect(rotated).toEqual([
        [false, true],
        [true, true],
      ]);
    });

    it('3x3のテトリミノを正しく回転する', () => {
      const originalShape = [
        [true, true, true],
        [false, true, false],
        [false, false, false],
      ];
      
      const rotated = rotateTetromino(originalShape);
      
      expect(rotated).toEqual([
        [false, false, true],
        [false, true, true],
        [false, false, true],
      ]);
    });
  });

  describe('isValidPosition', () => {
    it('有効な位置の場合trueを返す', () => {
      const board = createEmptyBoard();
      const tetromino = {
        type: 'I' as const,
        shape: TETROMINO_SHAPES.I,
        position: { x: 3, y: 0 },
      };
      
      expect(isValidPosition(tetromino, board)).toBe(true);
    });

    it('ボードの外に出ている場合falseを返す', () => {
      const board = createEmptyBoard();
      const tetromino = {
        type: 'I' as const,
        shape: TETROMINO_SHAPES.I,
        position: { x: -1, y: 0 }, // 左端を超えている
      };
      
      expect(isValidPosition(tetromino, board)).toBe(false);
    });

    it('既存のブロックと重なる場合falseを返す', () => {
      const board = createEmptyBoard();
      // Iテトリミノの形状は2行目（index:1）に横一列
      // なので、2行目のx=3にブロックを置くと必ず重なる
      board[1][3] = 'I'; // 既にブロックがある
      
      const tetromino = {
        type: 'I' as const,
        shape: TETROMINO_SHAPES.I,
        position: { x: 3, y: 0 },
      };
      
      expect(isValidPosition(tetromino, board)).toBe(false);
    });
  });

  describe('placeTetromino', () => {
    it('テトリミノをボードに正しく配置する', () => {
      const board = createEmptyBoard();
      const tetromino = {
        type: 'I' as const,
        shape: TETROMINO_SHAPES.I,
        position: { x: 3, y: 0 },
      };
      
      const newBoard = placeTetromino(tetromino, board);
      
      // Iテトリミノの形状を確認
      expect(newBoard[1][3]).toBe('I');
      expect(newBoard[1][4]).toBe('I');
      expect(newBoard[1][5]).toBe('I');
      expect(newBoard[1][6]).toBe('I');
    });
  });

  describe('clearCompletedLines', () => {
    it('完成した行を削除する', () => {
      const board = createEmptyBoard();
      // 一番下の行を完成させる
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board[BOARD_HEIGHT - 1][x] = 'I';
      }
      
      const result = clearCompletedLines(board);
      
      expect(result.linesCleared).toBe(1);
      expect(result.board[BOARD_HEIGHT - 1].every(cell => cell === null)).toBe(true);
    });

    it('複数の完成した行を削除する', () => {
      const board = createEmptyBoard();
      // 下から2行を完成させる
      for (let y = BOARD_HEIGHT - 2; y < BOARD_HEIGHT; y++) {
        for (let x = 0; x < BOARD_WIDTH; x++) {
          board[y][x] = 'I';
        }
      }
      
      const result = clearCompletedLines(board);
      
      expect(result.linesCleared).toBe(2);
      expect(result.board[BOARD_HEIGHT - 2].every(cell => cell === null)).toBe(true);
      expect(result.board[BOARD_HEIGHT - 1].every(cell => cell === null)).toBe(true);
    });
  });

  describe('isGameOver', () => {
    it('ゲームオーバーでない場合falseを返す', () => {
      const board = createEmptyBoard();
      expect(isGameOver(board)).toBe(false);
    });

    it('一番上の行にブロックがある場合trueを返す', () => {
      const board = createEmptyBoard();
      board[0][0] = 'I';
      
      expect(isGameOver(board)).toBe(true);
    });
  });
}); 