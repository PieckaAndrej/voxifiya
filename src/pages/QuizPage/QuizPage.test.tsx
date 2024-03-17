import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import QuizPage from './QuizPage';

describe('<QuizPage />', () => {
  test('it should mount', () => {
    render(<QuizPage />);

    const quizPage = screen.getByTestId('QuizPage');

    expect(quizPage).toBeInTheDocument();
  });
});