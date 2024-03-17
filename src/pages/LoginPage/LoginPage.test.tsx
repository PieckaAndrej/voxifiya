import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

describe('<LoginPage />', () => {
  test('it should mount', () => {
    render(<LoginPage />);

    const loginPage = screen.getByTestId('LoginPage');

    expect(loginPage).toBeInTheDocument();
  });
});