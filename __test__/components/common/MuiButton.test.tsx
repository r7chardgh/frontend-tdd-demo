import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MuiButton from '@/components/common/MuiButton';
import { Button } from '@mui/material';

// Mock the MUI Button component
jest.mock('@mui/material', () => ({
    Button: jest.fn(({ children, ...props }) => <button {...props}>{children}</button>),
}));

describe('test MuiButton', () => {
    beforeEach(() => {
        (Button as jest.Mock).mockClear();
    });

    it('renders button with children correctly', () => {
        render(<MuiButton>Submit</MuiButton>);
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('disables button', () => {
        render(<MuiButton disabled data-testid="muibutton">Submit</MuiButton>);
        const button = screen.getByTestId('muibutton');
        expect(button).toBeDisabled();
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<MuiButton onClick={handleClick}>Submit</MuiButton>);
        const button = screen.getByText('Submit');
        fireEvent.click(button);    
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});