// store.js
import { configureStore } from '@reduxjs/toolkit';
import adminReducers from './reducers/adminReducers'; // Import the admin reducer
import productReducers from './reducers/productReducers'; // Import the product reducer
import inventoryReducers from './reducers/inventoryReducers';

const store = configureStore({
  reducer: {
    admin: adminReducers, // Add the admin reducer to the store
    product: productReducers, // Add the product reducer to the store
    inventory: inventoryReducers, // Add the inventory reducer to the store
  },
});

export default store;
