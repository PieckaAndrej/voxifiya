import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import GradientBackground from './GradientBackground';

describe('<GradientBackground />', () => {
  test('it should mount', () => {
    render(<GradientBackground />);

    const gradientBackground = screen.getByTestId('GradientBackground');

    expect(gradientBackground).toBeInTheDocument();
  });
});