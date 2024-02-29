import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SentenceRow from './SentenceRow';

describe('<SentenceRow />', () => {
  test('it should mount', () => {
    render(<SentenceRow sentence={{
      createdDate: new Date(),
      text: 'hel',
      translatedText: 'hello',
      id: ''
    }}/>);

    const sentenceRow = screen.getByTestId('SentenceRow');

    expect(sentenceRow).toBeInTheDocument();
  });
});