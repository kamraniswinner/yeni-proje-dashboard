const initialState = {
  admin: null,
  loading: false,
  error: null,
  success: false,
  isAuthenticated: false,
  resetPasswordLinkSuccess: false,
  passwordResetSuccess: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ADMIN_USER_REQUEST':
      return { ...state, loading: true, error: null, success: false };
    case 'CREATE_ADMIN_USER_SUCCESS':
      return { ...state, loading: false, admin: action.payload, success: true };
    case 'CREATE_ADMIN_USER_FAILURE':
      return { ...state, loading: false, error: action.payload, success: false };

    case 'ADMIN_LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'ADMIN_LOGIN_SUCCESS':
      return { ...state, loading: false, admin: action.payload, isAuthenticated: true, error: null };
    case 'ADMIN_LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'REQUEST_ADMIN_PASSWORD_RESET_REQUEST':
      return { ...state, loading: true, error: null, resetPasswordLinkSuccess: false };
    case 'REQUEST_ADMIN_PASSWORD_RESET_SUCCESS':
      return { ...state, loading: false, resetPasswordLinkSuccess: true };
    case 'REQUEST_ADMIN_PASSWORD_RESET_FAILURE':
      return { ...state, loading: false, error: action.payload, resetPasswordLinkSuccess: false };

    case 'CONFIRM_ADMIN_PASSWORD_RESET_REQUEST':
      return { ...state, loading: true, error: null, passwordResetSuccess: false };
    case 'CONFIRM_ADMIN_PASSWORD_RESET_SUCCESS':
      return { ...state, loading: false, passwordResetSuccess: true };
    case 'CONFIRM_ADMIN_PASSWORD_RESET_FAILURE':
      return { ...state, loading: false, error: action.payload, passwordResetSuccess: false };

    case 'ADMIN_LOGOUT':
      return { ...state, admin: null, isAuthenticated: false, error: null };

    default:
      return state;
  }
};

export default adminReducer;
