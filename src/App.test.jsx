import { render, screen } from '@testing-library/react';
import App from './App';

it('renders headline', () => {
  render(<App />);
  const headline = screen.getByText(/T3XT TR4N5F0RM3R/i);
  expect(headline).toBeInTheDocument();
});