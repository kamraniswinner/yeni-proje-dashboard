import axios from 'axios';

export const createAdminUser = (username, email, password, role) => async (dispatch) => {
  dispatch({ type: 'CREATE_ADMIN_USER_REQUEST' });

  try {
  //  const { auth } = getState();
   // const admin = auth && auth.admin;

   // if (!admin || !admin.token) {
   //   throw new Error('Admin is not authenticated');
   // }

    //const config = {
    //  headers: {
    //    'Content-Type': 'application/json',
    //    Authorization: `Bearer ${admin.token}`,
    //  },
   // };

    const { data } = await axios.post('http://localhost:5000/api/admin/createAdmin', { username, email, password, role });
    dispatch({ type: 'CREATE_ADMIN_USER_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'CREATE_ADMIN_USER_FAILURE',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminLogin = (email, password) => async (dispatch) => {
  dispatch({ type: 'ADMIN_LOGIN_REQUEST' });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/admin/login', { email, password }, config);
    localStorage.setItem('admin', JSON.stringify(data));
    dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'ADMIN_LOGIN_FAILURE',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const requestAdminPasswordReset = (email) => async (dispatch) => {
  dispatch({ type: 'REQUEST_ADMIN_PASSWORD_RESET_REQUEST' });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/admin/requestPasswordReset', { email }, config);
    dispatch({ type: 'REQUEST_ADMIN_PASSWORD_RESET_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'REQUEST_ADMIN_PASSWORD_RESET_FAILURE',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const confirmAdminPasswordReset = (token, newPassword) => async (dispatch) => {
  dispatch({ type: 'CONFIRM_ADMIN_PASSWORD_RESET_REQUEST' });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/admin/confirmPasswordReset', { token, newPassword }, config);
    dispatch({ type: 'CONFIRM_ADMIN_PASSWORD_RESET_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'CONFIRM_ADMIN_PASSWORD_RESET_FAILURE',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const adminLogout = () => {
  localStorage.removeItem('admin');
  return { type: 'ADMIN_LOGOUT' };
};
