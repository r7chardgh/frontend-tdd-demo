import authReducer, { login, logout } from '@/lib/features/login/loginSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    token: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login action', () => {
    const action = login({ token: 'test-token' });
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      isAuthenticated: true,
      token: 'test-token',
    });
  });

  it('should handle logout action', () => {
    const previousState = {
      isAuthenticated: true,
      token: 'test-token',
    };
    const state = authReducer(previousState, logout());
    expect(state).toEqual({
      isAuthenticated: false,
      token: null,
    });
  });

  it('should not mutate state with unknown action', () => {
    const previousState = {
      isAuthenticated: true,
      token: 'test-token',
    };
    const state = authReducer(previousState, { type: 'unknown' });
    expect(state).toEqual(previousState);
  });
});