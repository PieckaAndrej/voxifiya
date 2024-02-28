import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidenav from './Sidenav';

describe('<Sidenav />', () => {
  test('it should mount', () => {
    render(<Sidenav />);

    const sidenav = screen.getByTestId('Sidenav');

    expect(sidenav).toBeInTheDocument();
  });
});