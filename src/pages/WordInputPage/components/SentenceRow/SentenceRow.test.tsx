import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import SentenceRow from './SentenceRow';

describe('<SentenceRow />', () => {
  test('it should mount', () => {
    render(<SentenceRow sentence={{
      text: '',
      language: ''
    }}
    editing={false}
    setEditing={() => {}}
    updateSentence={() => {}}
    deleteSentence={() => {}}
    />);

    const sentenceRow = screen.getByTestId('SentenceRow');

    expect(sentenceRow).toBeInTheDocument();
  });
});