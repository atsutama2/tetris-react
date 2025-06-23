import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTetris } from '../hooks/useTetris';
import { GameBoard } from './GameBoard';
import { GameInfo } from './GameInfo';
import { Controls } from './Controls';

const GameContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #111;
  min-height: 100vh;
  justify-content: center;
  align-items: flex-start;
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SidePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TetrisGame: React.FC = () => {
  const { gameState, dispatch, startGame } = useTetris();

  // キーボードイベントの処理
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState.isGameOver) {
        if (event.code === 'Space') {
          dispatch({ type: 'RESTART' });
        }
        return;
      }

      switch (event.code) {
        case 'ArrowLeft':
          event.preventDefault();
          dispatch({ type: 'MOVE_LEFT' });
          break;
        case 'ArrowRight':
          event.preventDefault();
          dispatch({ type: 'MOVE_RIGHT' });
          break;
        case 'ArrowDown':
          event.preventDefault();
          dispatch({ type: 'MOVE_DOWN' });
          break;
        case 'ArrowUp':
          event.preventDefault();
          dispatch({ type: 'ROTATE' });
          break;
        case 'Space':
          event.preventDefault();
          dispatch({ type: 'DROP' });
          break;
        case 'KeyP':
          event.preventDefault();
          dispatch({ type: gameState.isPaused ? 'RESUME' : 'PAUSE' });
          break;
        case 'KeyR':
          event.preventDefault();
          dispatch({ type: 'RESTART' });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, gameState.isGameOver, gameState.isPaused]);

  // ゲーム開始
  useEffect(() => {
    startGame();
  }, [startGame]);

  return (
    <GameContainer>
      <GameArea>
        <GameBoard
          board={gameState.board}
          currentTetromino={gameState.currentTetromino}
        />
        <Controls
          onAction={dispatch}
          isGameOver={gameState.isGameOver}
          isPaused={gameState.isPaused}
        />
      </GameArea>
      
      <SidePanel>
        <GameInfo
          score={gameState.score}
          level={gameState.level}
          lines={gameState.lines}
          nextTetromino={gameState.nextTetromino}
          isGameOver={gameState.isGameOver}
          isPaused={gameState.isPaused}
        />
      </SidePanel>
    </GameContainer>
  );
}; 