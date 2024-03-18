import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LanguageSelect from './LanguageSelect';

describe('<LanguageSelect />', () => {
  test('it should mount', () => {
    render(<LanguageSelect
      canClose={false}
      dialogOpen={false}
      setDialogOpen={() => {}}/>);

    const languageSelect = screen.getByTestId('LanguageSelect');

    expect(languageSelect).toBeInTheDocument();
  });
});