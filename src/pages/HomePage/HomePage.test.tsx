import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('<HomePage />', () => {
  test('it should mount', () => {
    render(<HomePage />);

    const homePage = screen.getByTestId('HomePage');

    expect(homePage).toBeInTheDocument();
  });
});