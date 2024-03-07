import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LanguageSelect from './LanguageSelect';

describe('<LanguageSelect />', () => {
  test('it should mount', () => {
    render(<LanguageSelect />);

    const languageSelect = screen.getByTestId('LanguageSelect');

    expect(languageSelect).toBeInTheDocument();
  });
});