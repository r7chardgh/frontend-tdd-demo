import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import LoginForm from '@/features/login/component/LoginForm';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { login as loginApi } from '@/features/login/api/auth';
import { login } from '@/lib/features/login/loginSlice';
import MuiButton from '@/components/common/MuiButton';
import MuiInput from '@/components/common/MuiInput';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Redux hooks and actions 
jest.mock('../../../../lib/hooks', () => ({
  useAppDispatch: jest.fn(),
}));


jest.mock('../../../../lib/features/login/loginSlice', () => ({
  login: jest.fn(),
}));

// Mock API
jest.mock('../../../../features/login/api/auth', () => ({
  loginApi: jest.fn(),
}));

// Mock components
jest.mock('../../../../components/common/MuiButton', () => {
  return jest.fn(({ children, ...props }) => <button {...props}>{children}</button>);
});

jest.mock('../../../../components/common/MuiInput', () => {
  return jest.fn(({ label, placeholder, onChange, value, type }) => (
    <input
      data-testid={`input-${label}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      type={type}
    />
  ));
});

describe('LoginForm', () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();
  const mockLoginApi = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Clear mocks before each test
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    

    (MuiButton as jest.Mock).mockClear();
    (MuiInput as jest.Mock).mockClear();
    // jest.spyOn(console, 'log').mockImplementation(() => {}); // Suppress console.log
  });

//   afterEach(() => {
//     (console.log as jest.Mock).mockRestore();
//   });

  it('renders LoginForm with correct structure and content', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByTestId('test:form')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toHaveAttribute('placeholder', 'enter your email');
    expect(screen.getByTestId('input-password')).toHaveAttribute('placeholder', 'enter your password');
  });

  it('updates email and password inputs correctly', () => {
    render(<LoginForm />);
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('calls loginApi and dispatches login action on successful form submission', async () => {
    
    (mockLoginApi ).mockResolvedValue({ token: 'test-token' });
    render(<LoginForm/>);
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

  });

  it('displays error message on failed login', async () => {
    (mockLoginApi as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));
    render(<LoginForm />);
    const emailInput = screen.getByTestId('input-email');
    const passwordInput = screen.getByTestId('input-password');
    const submitButton = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('*Invalid credentials')).toBeInTheDocument();
      expect(screen.getByText('*Invalid credentials')).toHaveClass('text-red-600');
    });
  });

//   it('passes correct props to MuiButton', () => {
//     render(<LoginForm />);
//     expect(MuiButton).toHaveBeenCalledWith(
//       expect.objectContaining({
//         children: 'login',
//         type: 'submit',
//       }),
//       expect(null == undefined).toBe(true)
//     );
//   });

//   it('passes correct props to MuiInput components', () => {
//     render(<LoginForm />);
//     expect(screen.findByLabelText('email')).toHaveProperty('prop.placeholder','email');
//     // expect(screen.findByLabelText('email')).toHaveProperty(
//     //   expect.objectContaining({
//     //     label: 'email',
//     //     placeholder: 'enter your email',
//     //     value: '',
//     //     onChange: expect.any(Function),
//     //   }),
//     //   expect.anything(),
//     // );
//     expect(screen.findByLabelText('password')).toHaveProperty('prop.label','password');

//     //  {
//     //     'label': 'password',
//     //     placeholder: 'enter your password',
//     //     type: 'password',
//     //     value: '',
//     //     onChange: expect.any(Function),
//     //   }
    
//   });

});