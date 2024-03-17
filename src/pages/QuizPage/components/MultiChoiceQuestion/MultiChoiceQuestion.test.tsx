import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import MultiChoiceQuestion from './MultiChoiceQuestion';
import { QuizType } from '../../../../models/enums/quizType';

describe('<MultiChoiceQuestion />', () => {
  test('it should mount', () => {
    render(<MultiChoiceQuestion question={{
        id: '',
        userSentenceId: '',
        question: '',
        correctAnswer: '',
        wrongAnswers: [],
        type: QuizType.GuessForeign
      }}
      onAnswer={() => {}}
      onNextQuestion={() => {}}
      />);

    const multiChoiceQuestion = screen.getByTestId('MultiChoiceQuestion');

    expect(multiChoiceQuestion).toBeInTheDocument();
  });
});