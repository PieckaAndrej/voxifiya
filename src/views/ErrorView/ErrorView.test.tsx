import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorView from './ErrorView';

describe('<ErrorView />', () => {
  test('it should mount', () => {
    render(<ErrorView />);

    const errorView = screen.getByTestId('ErrorView');

    expect(errorView).toBeInTheDocument();
  });
});