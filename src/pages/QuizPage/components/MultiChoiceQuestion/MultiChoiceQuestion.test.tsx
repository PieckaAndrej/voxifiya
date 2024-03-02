import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultiChoiceQuestion from './MultiChoiceQuestion';

describe('<MultiChoiceQuestion />', () => {
  test('it should mount', () => {
    render(<MultiChoiceQuestion />);

    const multiChoiceQuestion = screen.getByTestId('MultiChoiceQuestion');

    expect(multiChoiceQuestion).toBeInTheDocument();
  });
});