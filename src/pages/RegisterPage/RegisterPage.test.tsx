import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterPage from './RegisterPage';

describe('<RegisterPage />', () => {
  test('it should mount', () => {
    render(<RegisterPage />);

    const registerPage = screen.getByTestId('RegisterPage');

    expect(registerPage).toBeInTheDocument();
  });
});