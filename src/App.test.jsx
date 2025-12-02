import { render, screen } from '@testing-library/react';
import App from './App';

it('renders headline', () => {
  render(<App />);
  const headline = screen.getByText(/Text Transformer/i);
  expect(headline).toBeInTheDocument();
});