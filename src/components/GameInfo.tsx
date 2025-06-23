import React from 'react';
import styled from 'styled-components';
import { Tetromino } from '../types/tetris';
import { TETROMINO_COLORS } from '../constants/tetrominos';

interface GameInfoProps {
  score: number;
  level: number;
  lines: number;
  nextTetromino: Tetromino | null;
  isGameOver: boolean;
  isPaused: boolean;
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #222;
  border: 2px solid #666;
  border-radius: 8px;
  min-width: 200px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const InfoValue = styled.div`
  color: #00ff00;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Courier New', monospace;
`;

const NextTetrominoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 20px);
  grid-template-rows: repeat(4, 20px);
  gap: 1px;
  background-color: #333;
  border: 1px solid #666;
  padding: 10px;
  justify-content: center;
`;

const NextCell = styled.div<{ $isFilled: boolean; $color?: string }>`
  width: 20px;
  height: 20px;
  background-color: ${props => props.$isFilled ? props.$color || '#666' : '#111'};
  border: 1px solid #333;
  box-sizing: border-box;
`;

const GameStatus = styled.div<{ $isGameOver: boolean; $isPaused: boolean }>`
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #fff;
  background-color: ${props => {
    if (props.$isGameOver) return '#ff0000';
    if (props.$isPaused) return '#ffaa00';
    return '#00ff00';
  }};
`;

export const GameInfo: React.FC<GameInfoProps> = ({
  score,
  level,
  lines,
  nextTetromino,
  isGameOver,
  isPaused,
}) => {
  const getStatusText = () => {
    if (isGameOver) return 'GAME OVER';
    if (isPaused) return 'PAUSED';
    return 'PLAYING';
  };

  return (
    <InfoContainer>
      <GameStatus $isGameOver={isGameOver} $isPaused={isPaused}>
        {getStatusText()}
      </GameStatus>
      
      <InfoSection>
        <InfoTitle>Score</InfoTitle>
        <InfoValue>{score.toLocaleString()}</InfoValue>
      </InfoSection>
      
      <InfoSection>
        <InfoTitle>Level</InfoTitle>
        <InfoValue>{level}</InfoValue>
      </InfoSection>
      
      <InfoSection>
        <InfoTitle>Lines</InfoTitle>
        <InfoValue>{lines}</InfoValue>
      </InfoSection>
      
      <InfoSection>
        <InfoTitle>Next</InfoTitle>
        <NextTetrominoContainer>
          {nextTetromino ? (
            nextTetromino.shape.map((row, y) =>
              row.map((cell, x) => (
                <NextCell
                  key={`next-${y}-${x}`}
                  $isFilled={cell}
                  $color={cell ? TETROMINO_COLORS[nextTetromino.type] : undefined}
                />
              ))
            )
          ) : (
            Array(16).fill(null).map((_, i) => (
              <NextCell key={`empty-${i}`} $isFilled={false} />
            ))
          )}
        </NextTetrominoContainer>
      </InfoSection>
    </InfoContainer>
  );
}; 