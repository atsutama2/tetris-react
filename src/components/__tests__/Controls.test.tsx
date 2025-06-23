import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Controls } from '../Controls';

describe('Controls', () => {
  const mockOnAction = jest.fn();

  beforeEach(() => {
    mockOnAction.mockClear();
  });

  it('すべてのコントロールボタンを表示する', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    expect(screen.getByText('← Left')).toBeInTheDocument();
    expect(screen.getByText('Right →')).toBeInTheDocument();
    expect(screen.getByText('↓ Down')).toBeInTheDocument();
    expect(screen.getByText('Rotate')).toBeInTheDocument();
    expect(screen.getByText('Hard Drop')).toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.getByText('Restart')).toBeInTheDocument();
  });

  it('左移動ボタンが正しく動作する', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    fireEvent.click(screen.getByText('← Left'));
    
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'MOVE_LEFT' });
  });

  it('右移動ボタンが正しく動作する', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    fireEvent.click(screen.getByText('Right →'));
    
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'MOVE_RIGHT' });
  });

  it('下移動ボタンが正しく動作する', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    fireEvent.click(screen.getByText('↓ Down'));
    
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'MOVE_DOWN' });
  });

  it('回転ボタンが正しく動作する', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    fireEvent.click(screen.getByText('Rotate'));
    
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'ROTATE' });
  });

  it('ハードドロップボタンが正しく動作する', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    fireEvent.click(screen.getByText('Hard Drop'));
    
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'DROP' });
  });

  it('一時停止状態でResumeボタンが表示される', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={true} />);
    
    expect(screen.getByText('Resume')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Resume'));
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'RESUME' });
  });

  it('通常状態でPauseボタンが表示される', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    expect(screen.getByText('Pause')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Pause'));
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'PAUSE' });
  });

  it('Restartボタンが正しく動作する', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    fireEvent.click(screen.getByText('Restart'));
    
    expect(mockOnAction).toHaveBeenCalledWith({ type: 'RESTART' });
  });

  it('ゲームオーバー時にボタンが無効化される', () => {
    render(<Controls onAction={mockOnAction} isGameOver={true} isPaused={false} />);
    
    // Restart以外のボタンが無効化されることを確認
    expect(screen.getByText('← Left')).toBeDisabled();
    expect(screen.getByText('Right →')).toBeDisabled();
    expect(screen.getByText('↓ Down')).toBeDisabled();
    expect(screen.getByText('Rotate')).toBeDisabled();
    expect(screen.getByText('Hard Drop')).toBeDisabled();
    expect(screen.getByText('Pause')).toBeDisabled();
    
    // Restartボタンは有効
    expect(screen.getByText('Restart')).not.toBeDisabled();
  });

  it('キーボード操作の説明が表示される', () => {
    render(<Controls onAction={mockOnAction} isGameOver={false} isPaused={false} />);
    
    expect(screen.getByText('キーボード操作:')).toBeInTheDocument();
    expect(screen.getByText(/← → 移動/)).toBeInTheDocument();
  });
}); 