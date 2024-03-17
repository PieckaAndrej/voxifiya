import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import UserMenu from './UserMenu';

describe('<UserMenu />', () => {
  test('it should mount', () => {
    render(<UserMenu />);

    const userMenu = screen.getByTestId('UserMenu');

    expect(userMenu).toBeInTheDocument();
  });
});