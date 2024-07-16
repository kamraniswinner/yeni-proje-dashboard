// productActions.jss
import axios from 'axios';
// actionTypes.js
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const FETCH_PRODUCT_REQUEST_BY_ID = 'FETCH_PRODUCT_REQUEST_BY_ID';
export const FETCH_PRODUCT_SUCCESS_BY_ID = 'FETCH_PRODUCT_SUCCESS_BY_ID';
export const FETCH_PRODUCT_FAILURE_BY_ID = 'FETCH_PRODUCT_FAILURE_BY_ID';

export const CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE';

export const UPDATE_PRODUCT_REQUEST = 'UPDATE_PRODUCT_REQUEST';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAILURE = 'UPDATE_PRODUCT_FAILURE';

export const DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE';


const API_URL = 'http://localhost:5000/api/products'; // replace with your actual API URLl

export const fetchProducts = () => async dispatch => {
  dispatch({ type: FETCH_PRODUCTS_REQUEST });
  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const fetchProduct = productNumber => async dispatch => {
  dispatch({ type: FETCH_PRODUCT_REQUEST_BY_ID });
  try {
    const response = await axios.get(`${API_URL}/${productNumber}`);
    dispatch({ type: FETCH_PRODUCT_SUCCESS_BY_ID, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAILURE_BY_ID, payload: error.message });
  }
};

export const createProduct = product => async dispatch => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('Sending product data:', product); // Log the product data
    const response = await axios.post(API_URL, product, config);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.response.data.message || error.message });
  }
};

export const updateProduct = (productNumber, product) => async dispatch => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  try {     
    const response = await axios.put(`${API_URL}/${productNumber}`, product);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = productNumber => async dispatch => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  try {
    await axios.delete(`${API_URL}/${productNumber}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productNumber });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};
