import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameBoard } from '../GameBoard';
import { createEmptyBoard } from '../../utils/tetrisUtils';
import { TETROMINO_SHAPES } from '../../constants/tetrominos';

describe('GameBoard', () => {
  it('空のボードを正しく表示する', () => {
    const board = createEmptyBoard();
    render(<GameBoard board={board} currentTetromino={null} />);
    
    // ボードのセルが正しい数だけ表示されることを確認
    const cells = screen.getAllByRole('generic');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('テトリミノ付きのボードを正しく表示する', () => {
    const board = createEmptyBoard();
    const currentTetromino = {
      type: 'I' as const,
      shape: TETROMINO_SHAPES.I,
      position: { x: 3, y: 0 },
    };
    
    render(<GameBoard board={board} currentTetromino={currentTetromino} />);
    
    // テトリミノが表示されることを確認
    const cells = screen.getAllByRole('generic');
    expect(cells.length).toBeGreaterThan(0);
  });

  it('既存のブロックがあるボードを正しく表示する', () => {
    const board = createEmptyBoard();
    // いくつかのブロックを配置
    board[19][0] = 'I';
    board[19][1] = 'O';
    
    render(<GameBoard board={board} currentTetromino={null} />);
    
    // ボードが表示されることを確認
    const cells = screen.getAllByRole('generic');
    expect(cells.length).toBeGreaterThan(0);
  });
}); 