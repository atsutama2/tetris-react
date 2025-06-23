import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('テトリスゲームのAppコンポーネントが描画される', () => {
  render(<App />);
  
  // ゲームの要素が表示されることを確認
  expect(screen.getByText('← Left')).toBeInTheDocument();
  expect(screen.getByText('Right →')).toBeInTheDocument();
  expect(screen.getByText('Score')).toBeInTheDocument();
});
