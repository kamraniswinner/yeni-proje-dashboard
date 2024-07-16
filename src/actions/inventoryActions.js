// src/actions/inventoryActions.js
import axios from 'axios';
// src/actions/actionTypes.js
export const FETCH_INVENTORY_REQUEST = 'FETCH_INVENTORY_REQUEST';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';

export const FETCH_SINGLE_INVENTORY_REQUEST = 'FETCH_SINGLE_INVENTORY_REQUEST';
export const FETCH_SINGLE_INVENTORY_SUCCESS = 'FETCH_SINGLE_INVENTORY_SUCCESS';
export const FETCH_SINGLE_INVENTORY_FAILURE = 'FETCH_SINGLE_INVENTORY_FAILURE';

export const FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_REQUEST = 'FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_REQUEST';
export const FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_SUCCESS = 'FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_SUCCESS';
export const FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_FAILURE = 'FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_FAILURE';

export const CREATE_INVENTORY_REQUEST = 'CREATE_INVENTORY_REQUEST';
export const CREATE_INVENTORY_SUCCESS = 'CREATE_INVENTORY_SUCCESS';
export const CREATE_INVENTORY_FAILURE = 'CREATE_INVENTORY_FAILURE';

export const UPDATE_INVENTORY_REQUEST = 'UPDATE_INVENTORY_REQUEST';
export const UPDATE_INVENTORY_SUCCESS = 'UPDATE_INVENTORY_SUCCESS';
export const UPDATE_INVENTORY_FAILURE = 'UPDATE_INVENTORY_FAILURE';

export const DELETE_INVENTORY_REQUEST = 'DELETE_INVENTORY_REQUEST';
export const DELETE_INVENTORY_SUCCESS = 'DELETE_INVENTORY_SUCCESS';
export const DELETE_INVENTORY_FAILURE = 'DELETE_INVENTORY_FAILURE';


// Fetch all inventory items
export const fetchInventory = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_INVENTORY_REQUEST });
    const { data } = await axios.get('http://localhost:5000/api/inventory');
    dispatch({ type: FETCH_INVENTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_INVENTORY_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch a single inventory item by _id
export const fetchSingleInventory = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SINGLE_INVENTORY_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/inventory/${id}`);
    dispatch({ type: FETCH_SINGLE_INVENTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_INVENTORY_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Fetch a single inventory item by product number
export const fetchSingleInventorybyproductnumber = (productNumber) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/api/inventory/bynumber/${productNumber}`);
    dispatch({ type: FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


// Create a new inventory item
export const createInventory = (formData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INVENTORY_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await axios.post('http://localhost:5000/api/inventory/create', formData, config);

    dispatch({
      type: CREATE_INVENTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_INVENTORY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Update an inventory item
export const updateInventory = (productNumber, inventory) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INVENTORY_REQUEST });
    const { data } = await axios.put(`http://localhost:5000/api/inventory/${productNumber}`, inventory);
    dispatch({ type: UPDATE_INVENTORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_INVENTORY_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};

// Delete an inventory item
export const deleteInventory = (productNumber) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INVENTORY_REQUEST });
    await axios.delete(`http://localhost:5000/api/inventory/${productNumber}`);
    dispatch({ type: DELETE_INVENTORY_SUCCESS, payload: productNumber });
  } catch (error) {
    dispatch({
      type: DELETE_INVENTORY_FAILURE,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
