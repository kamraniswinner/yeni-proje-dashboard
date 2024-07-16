// productReducers.js
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

  
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};
  
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_PRODUCT_REQUEST_BY_ID:
      return { ...state, loading: true, error: null };
    case FETCH_PRODUCT_SUCCESS_BY_ID:
      return { ...state, loading: false, product: action.payload };
    case FETCH_PRODUCT_FAILURE_BY_ID:
      return { ...state, loading: false, error: action.payload };

    case CREATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: [...state.products, action.payload] };
    case CREATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
      
    case UPDATE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map(product =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case UPDATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.filter(product => product._id !== action.payload),
      };
    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
  
  
export default productReducer;