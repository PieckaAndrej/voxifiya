import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import WordInputPage from './WordInputPage';

describe('<WordInputPage />', () => {
  test('it should mount', () => {
    render(<WordInputPage />);

    const wordInputPage = screen.getByTestId('WordInputPage');

    expect(wordInputPage).toBeInTheDocument();
  });
});