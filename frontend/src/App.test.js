import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app title', () => {
    render(<App />);
    const titleElement = screen.getByRole('heading', { name: /ask_hercules AI Query Assistant/i }); // Use getByRole
    expect(titleElement).toBeInTheDocument();
});
