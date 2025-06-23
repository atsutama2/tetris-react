import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameInfo } from '../GameInfo';
import { TETROMINO_SHAPES } from '../../constants/tetrominos';

describe('GameInfo', () => {
  const defaultProps = {
    score: 1000,
    level: 2,
    lines: 15,
    nextTetromino: {
      type: 'I' as const,
      shape: TETROMINO_SHAPES.I,
      position: { x: 0, y: 0 },
    },
    isGameOver: false,
    isPaused: false,
  };

  it('ゲーム情報を正しく表示する', () => {
    render(<GameInfo {...defaultProps} />);
    
    expect(screen.getByText('PLAYING')).toBeInTheDocument();
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();
    expect(screen.getByText('Level')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Lines')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('ゲームオーバー状態を正しく表示する', () => {
    render(<GameInfo {...defaultProps} isGameOver={true} />);
    
    expect(screen.getByText('GAME OVER')).toBeInTheDocument();
  });

  it('一時停止状態を正しく表示する', () => {
    render(<GameInfo {...defaultProps} isPaused={true} />);
    
    expect(screen.getByText('PAUSED')).toBeInTheDocument();
  });

  it('次のテトリミノがない場合も正しく表示する', () => {
    render(<GameInfo {...defaultProps} nextTetromino={null} />);
    
    expect(screen.getByText('Next')).toBeInTheDocument();
  });
}); 