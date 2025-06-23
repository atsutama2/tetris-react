import { TetrominoType, TetrominoShape } from '../types/tetris';

// テトリミノの形状定義
export const TETROMINO_SHAPES: Record<TetrominoType, TetrominoShape> = {
  I: [
    [false, false, false, false],
    [true, true, true, true],
    [false, false, false, false],
    [false, false, false, false],
  ],
  O: [
    [true, true],
    [true, true],
  ],
  T: [
    [false, true, false],
    [true, true, true],
    [false, false, false],
  ],
  S: [
    [false, true, true],
    [true, true, false],
    [false, false, false],
  ],
  Z: [
    [true, true, false],
    [false, true, true],
    [false, false, false],
  ],
  J: [
    [true, false, false],
    [true, true, true],
    [false, false, false],
  ],
  L: [
    [false, false, true],
    [true, true, true],
    [false, false, false],
  ],
};

// テトリミノの色
export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00f5ff', // シアン
  O: '#ffff00', // 黄色
  T: '#a000f0', // 紫
  S: '#00f000', // 緑
  Z: '#f00000', // 赤
  J: '#0000f0', // 青
  L: '#ff7f00', // オレンジ
};

// ゲームボードのサイズ
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

// 初期位置（テトリミノが出現する位置）
export const INITIAL_POSITION = { x: 3, y: 0 }; 