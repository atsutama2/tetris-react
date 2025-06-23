import { useState, useCallback, useEffect, useRef } from 'react';
import { GameState, GameAction, Tetromino } from '../types/tetris';
import { createEmptyBoard, createRandomTetromino, isValidPosition, placeTetromino, clearCompletedLines, rotateTetromino } from '../utils/tetrisUtils';

// 初期状態
const initialState: GameState = {
  board: createEmptyBoard(),
  currentTetromino: null,
  nextTetromino: null,
  score: 0,
  level: 1,
  lines: 0,
  isGameOver: false,
  isPaused: false,
};

// スコア計算
const calculateScore = (linesCleared: number, level: number): number => {
  const points = [0, 100, 300, 500, 800];
  return points[linesCleared] * level;
};

// レベル計算
const calculateLevel = (lines: number): number => {
  return Math.floor(lines / 10) + 1;
};

// 落下速度計算（ミリ秒）
const calculateDropSpeed = (level: number): number => {
  return Math.max(50, 1000 - (level - 1) * 100);
};

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const dropIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 新しいテトリミノを生成
  const spawnTetromino = useCallback(() => {
    setGameState(prev => {
      const nextTetromino = prev.nextTetromino || createRandomTetromino();
      const currentTetromino = createRandomTetromino();
      
      // ゲームオーバーチェック
      if (!isValidPosition(currentTetromino, prev.board)) {
        return { ...prev, isGameOver: true };
      }
      
      return {
        ...prev,
        currentTetromino,
        nextTetromino,
      };
    });
  }, []);

  // ゲーム開始
  const startGame = useCallback(() => {
    setGameState(initialState);
    spawnTetromino();
  }, [spawnTetromino]);

  // テトリミノを移動
  const moveTetromino = useCallback((dx: number, dy: number) => {
    setGameState(prev => {
      if (!prev.currentTetromino || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      const newTetromino: Tetromino = {
        ...prev.currentTetromino,
        position: {
          x: prev.currentTetromino.position.x + dx,
          y: prev.currentTetromino.position.y + dy,
        },
      };

      if (isValidPosition(newTetromino, prev.board)) {
        return { ...prev, currentTetromino: newTetromino };
      }

      // 下に移動できない場合、テトリミノを固定
      if (dy > 0) {
        const newBoard = placeTetromino(prev.currentTetromino, prev.board);
        const { board: clearedBoard, linesCleared } = clearCompletedLines(newBoard);
        const newLines = prev.lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const newScore = prev.score + calculateScore(linesCleared, prev.level);

        return {
          ...prev,
          board: clearedBoard,
          lines: newLines,
          level: newLevel,
          score: newScore,
          currentTetromino: null,
        };
      }

      return prev;
    });
  }, []);

  // テトリミノを回転
  const rotateCurrentTetromino = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentTetromino || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      const rotatedShape = rotateTetromino(prev.currentTetromino.shape);
      const newTetromino: Tetromino = {
        ...prev.currentTetromino,
        shape: rotatedShape,
      };

      if (isValidPosition(newTetromino, prev.board)) {
        return { ...prev, currentTetromino: newTetromino };
      }

      return prev;
    });
  }, []);

  // ハードドロップ
  const hardDrop = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentTetromino || prev.isGameOver || prev.isPaused) {
        return prev;
      }

      let dropDistance = 0;
      let testTetromino = { ...prev.currentTetromino };

      // どこまで落とせるか計算
      while (isValidPosition(testTetromino, prev.board)) {
        testTetromino.position.y++;
        dropDistance++;
      }

      // 実際に落とす
      const finalTetromino: Tetromino = {
        ...prev.currentTetromino,
        position: {
          x: prev.currentTetromino.position.x,
          y: prev.currentTetromino.position.y + dropDistance - 1,
        },
      };

      const newBoard = placeTetromino(finalTetromino, prev.board);
      const { board: clearedBoard, linesCleared } = clearCompletedLines(newBoard);
      const newLines = prev.lines + linesCleared;
      const newLevel = calculateLevel(newLines);
      const newScore = prev.score + calculateScore(linesCleared, prev.level) + dropDistance * 2;

      return {
        ...prev,
        board: clearedBoard,
        lines: newLines,
        level: newLevel,
        score: newScore,
        currentTetromino: null,
      };
    });
  }, []);

  // ゲームアクション処理
  const dispatch = useCallback((action: GameAction) => {
    switch (action.type) {
      case 'MOVE_LEFT':
        moveTetromino(-1, 0);
        break;
      case 'MOVE_RIGHT':
        moveTetromino(1, 0);
        break;
      case 'MOVE_DOWN':
        moveTetromino(0, 1);
        break;
      case 'ROTATE':
        rotateCurrentTetromino();
        break;
      case 'DROP':
        hardDrop();
        break;
      case 'PAUSE':
        setGameState(prev => ({ ...prev, isPaused: true }));
        break;
      case 'RESUME':
        setGameState(prev => ({ ...prev, isPaused: false }));
        break;
      case 'RESTART':
        startGame();
        break;
    }
  }, [moveTetromino, rotateCurrentTetromino, hardDrop, startGame]);

  // 自動落下
  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused || !gameState.currentTetromino) {
      return;
    }

    const speed = calculateDropSpeed(gameState.level);
    dropIntervalRef.current = setInterval(() => {
      moveTetromino(0, 1);
    }, speed);

    return () => {
      if (dropIntervalRef.current) {
        clearInterval(dropIntervalRef.current);
      }
    };
  }, [gameState.isGameOver, gameState.isPaused, gameState.currentTetromino, gameState.level, moveTetromino]);

  // 新しいテトリミノが必要な場合
  useEffect(() => {
    if (!gameState.currentTetromino && !gameState.isGameOver) {
      spawnTetromino();
    }
  }, [gameState.currentTetromino, gameState.isGameOver, spawnTetromino]);

  return {
    gameState,
    dispatch,
    startGame,
  };
}; 