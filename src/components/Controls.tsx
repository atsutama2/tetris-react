import React from 'react';
import styled from 'styled-components';
import { GameAction } from '../types/tetris';

interface ControlsProps {
  onAction: (action: GameAction) => void;
  isGameOver: boolean;
  isPaused: boolean;
}

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: #222;
  border: 2px solid #666;
  border-radius: 8px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  
  background-color: ${props => {
    switch (props.$variant) {
      case 'danger': return '#ff4444';
      case 'secondary': return '#666666';
      default: return '#4CAF50';
    }
  }};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Instructions = styled.div`
  color: #ccc;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
`;

export const Controls: React.FC<ControlsProps> = ({ onAction, isGameOver, isPaused }) => {
  const handleKeyPress = (action: GameAction) => {
    onAction(action);
  };

  return (
    <ControlsContainer>
      <ButtonRow>
        <Button
          onClick={() => handleKeyPress({ type: 'MOVE_LEFT' })}
          disabled={isGameOver}
        >
          ← Left
        </Button>
        <Button
          onClick={() => handleKeyPress({ type: 'MOVE_RIGHT' })}
          disabled={isGameOver}
        >
          Right →
        </Button>
      </ButtonRow>
      
      <ButtonRow>
        <Button
          onClick={() => handleKeyPress({ type: 'MOVE_DOWN' })}
          disabled={isGameOver}
        >
          ↓ Down
        </Button>
        <Button
          onClick={() => handleKeyPress({ type: 'ROTATE' })}
          disabled={isGameOver}
        >
          Rotate
        </Button>
      </ButtonRow>
      
      <ButtonRow>
        <Button
          onClick={() => handleKeyPress({ type: 'DROP' })}
          disabled={isGameOver}
          $variant="secondary"
        >
          Hard Drop
        </Button>
      </ButtonRow>
      
      <ButtonRow>
        <Button
          onClick={() => handleKeyPress({ type: isPaused ? 'RESUME' : 'PAUSE' })}
          disabled={isGameOver}
          $variant="secondary"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </Button>
        <Button
          onClick={() => handleKeyPress({ type: 'RESTART' })}
          $variant="danger"
        >
          Restart
        </Button>
      </ButtonRow>
      
      <Instructions>
        <div>キーボード操作:</div>
        <div>← → 移動 | ↓ 落下 | ↑ 回転 | スペース ハードドロップ | P 一時停止</div>
      </Instructions>
    </ControlsContainer>
  );
}; 