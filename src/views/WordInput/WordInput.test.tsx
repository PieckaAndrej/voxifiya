import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WordInput from './WordInput';

describe('<WordInput />', () => {
  test('it should mount', () => {
    render(<WordInput />);

    const wordInput = screen.getByTestId('WordInput');

    expect(wordInput).toBeInTheDocument();
  });
});