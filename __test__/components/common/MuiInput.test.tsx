import MuiInput from '@/components/common/MuiInput';
import { render, screen } from '@testing-library/react';

describe('test MuiInput', () => {
  const defaultProps = {
    label: 'Test Label',
    placeholder: 'Test Placeholder',
    type: 'text',
  };

  it('renders TextField', () => {
    render(<MuiInput  label="Test Label" placeholder='Test Placeholder' type='text' data-testid="test-input"/>);

    const textField = screen.getByTestId('test-input');
    expect(textField).toBeInTheDocument();
  });

});
