import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WordRow from './WordRow';

describe('<WordRow />', () => {
  test('it should mount', () => {
    render(<WordRow />);
    
    const wordRow = screen.getByTestId('WordRow');

    expect(wordRow).toBeInTheDocument();
  });
});