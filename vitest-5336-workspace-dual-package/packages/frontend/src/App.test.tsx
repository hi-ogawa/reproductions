import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('should render successfully', () => {
    render(<App />);

    const element = screen.getByText(/Hello, world!/i);

    expect(element).toBeInTheDocument();
  });
});
