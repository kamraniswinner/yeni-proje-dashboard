// src/actions/actionTypes.js
export const FETCH_INVENTORY_REQUEST = 'FETCH_INVENTORY_REQUEST';
export const FETCH_INVENTORY_SUCCESS = 'FETCH_INVENTORY_SUCCESS';
export const FETCH_INVENTORY_FAILURE = 'FETCH_INVENTORY_FAILURE';

export const FETCH_SINGLE_INVENTORY_REQUEST = 'FETCH_SINGLE_INVENTORY_REQUEST';
export const FETCH_SINGLE_INVENTORY_SUCCESS = 'FETCH_SINGLE_INVENTORY_SUCCESS';
export const FETCH_SINGLE_INVENTORY_FAILURE = 'FETCH_SINGLE_INVENTORY_FAILURE';

export const FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_REQUEST = 'FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_REQUEST';
export const FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_FAILURE = 'FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_FAILURE';
export const FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_SUCCESS = 'FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_SUCCESS';

export const CREATE_INVENTORY_REQUEST = 'CREATE_INVENTORY_REQUEST';
export const CREATE_INVENTORY_SUCCESS = 'CREATE_INVENTORY_SUCCESS';
export const CREATE_INVENTORY_FAILURE = 'CREATE_INVENTORY_FAILURE';

export const UPDATE_INVENTORY_REQUEST = 'UPDATE_INVENTORY_REQUEST';
export const UPDATE_INVENTORY_SUCCESS = 'UPDATE_INVENTORY_SUCCESS';
export const UPDATE_INVENTORY_FAILURE = 'UPDATE_INVENTORY_FAILURE';

export const DELETE_INVENTORY_REQUEST = 'DELETE_INVENTORY_REQUEST';
export const DELETE_INVENTORY_SUCCESS = 'DELETE_INVENTORY_SUCCESS';
export const DELETE_INVENTORY_FAILURE = 'DELETE_INVENTORY_FAILURE';

// src/reducers/inventoryReducers.js
const initialState = {
  inventoryItems: [],
  inventoryItem: null,
  loading: false,
  error: null,
};

const inventoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_REQUEST:
    case FETCH_SINGLE_INVENTORY_REQUEST:
    case FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_REQUEST:
    case CREATE_INVENTORY_REQUEST:
    case UPDATE_INVENTORY_REQUEST:
    case DELETE_INVENTORY_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_INVENTORY_FAILURE:
    case FETCH_SINGLE_INVENTORY_FAILURE:
    case FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_FAILURE:
    case CREATE_INVENTORY_FAILURE:
    case UPDATE_INVENTORY_FAILURE:
    case DELETE_INVENTORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_INVENTORY_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        inventoryItems: action.payload 
      };

    case FETCH_SINGLE_INVENTORY_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        inventoryItem: action.payload 
      };

      case FETCH_SINGLE_INVENTORY_BY_PRODUCTNUMBER_SUCCESS:
        return { 
          ...state, 
          loading: false, 
          inventoryItem: action.payload 
        };

    case CREATE_INVENTORY_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        inventoryItems: [...state.inventoryItems, action.payload] 
      };

    case UPDATE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryItems: state.inventoryItems.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        inventoryItem: state.inventoryItem?._id === action.payload._id ? action.payload : state.inventoryItem,
      };

    case DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventoryItems: state.inventoryItems.filter((item) => item._id !== action.payload),
        inventoryItem: state.inventoryItem?._id === action.payload ? null : state.inventoryItem,
      };

    default:
      return state;
  }
};

export default inventoryReducers;
