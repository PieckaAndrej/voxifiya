import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WordInputPage from './WordInputPage';

describe('<WordInputPage />', () => {
  test('it should mount', () => {
    render(<WordInputPage />);

    const wordInputPage = screen.getByTestId('WordInputPage');

    expect(wordInputPage).toBeInTheDocument();
  });
});