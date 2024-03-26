import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Welcome To GoviSewana message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome To GoviSewana/i);
  expect(welcomeElement).toBeInTheDocument();
});
