import React from 'react';
import styled from 'styled-components';
import { Board, Tetromino } from '../types/tetris';
import { TETROMINO_COLORS } from '../constants/tetrominos';

interface GameBoardProps {
  board: Board;
  currentTetromino: Tetromino | null;
}

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-template-rows: repeat(20, 30px);
  gap: 1px;
  background-color: #333;
  border: 2px solid #666;
  padding: 10px;
`;

const Cell = styled.div<{ $isFilled: boolean; $color?: string }>`
  width: 30px;
  height: 30px;
  background-color: ${props => props.$isFilled ? props.$color || '#666' : '#111'};
  border: 1px solid #333;
  box-sizing: border-box;
`;

export const GameBoard: React.FC<GameBoardProps> = ({ board, currentTetromino }) => {
  // ボードとテトリミノを合成した表示用ボードを作成
  const getDisplayBoard = (): Board => {
    const displayBoard = board.map(row => [...row]);
    
    if (currentTetromino) {
      const { shape, position, type } = currentTetromino;
      
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const boardX = position.x + x;
            const boardY = position.y + y;
            
            if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
              displayBoard[boardY][boardX] = type;
            }
          }
        }
      }
    }
    
    return displayBoard;
  };

  const displayBoard = getDisplayBoard();

  return (
    <BoardContainer>
      {displayBoard.map((row, y) =>
        row.map((cell, x) => (
          <Cell
            key={`${y}-${x}`}
            $isFilled={cell !== null}
            $color={cell ? TETROMINO_COLORS[cell] : undefined}
          />
        ))
      )}
    </BoardContainer>
  );
}; 