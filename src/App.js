import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import PasswordResetForm from './forms/PasswordResetForm';
import ConfirmPasswordForm from './forms/ConfirmPasswordForm';
import MainLayout from './MainLayout'; // Import the layout
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import CreateInventory from './pages/CreateInventory';
import InventoryPage from './pages/InventoryPage';
import UpdateInventory  from './pages/UpdateInventory';
import GetInventoryById from './pages/GetInventoryById';
import FetchAllInventory from './pages/FetchAllInventory';
import DeleteInventory from './pages/DeleteInventory';
import UpdateProduct from './pages/UpdateProduct';
import FetchAllProducts from './pages/FetchAllProducts';
import FetchProductById from './pages/FetchProductById';
import DeleteProduct from './pages/DeleteProduct';
import ProductPage from './pages/ProductPage';
import CreateProduct from './pages/CreateProduct';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/passwordreset" element={<PasswordResetForm />} />
      <Route path="/resetPassword/:token" element={<ConfirmPasswordForm />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/product"
        element={
          <PrivateRoute>
            <MainLayout>
              <ProductPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/product/create"
        element={
          <PrivateRoute>
            <MainLayout>
              <CreateProduct />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/product/update"
        element={
          <PrivateRoute>
            <MainLayout>
              <UpdateProduct />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/product/fetch"
        element={
          <PrivateRoute>
            <MainLayout>
              <FetchAllProducts />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/product/fetchone"
        element={
          <PrivateRoute>
            <MainLayout>
              <FetchProductById />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/product/delete"
        element={
          <PrivateRoute>
            <MainLayout>
              <DeleteProduct />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <MainLayout>
              <InventoryPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory/create"
        element={
          <PrivateRoute>
            <MainLayout>
              <CreateInventory />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="inventory/update"
        element={
          <PrivateRoute>
            <MainLayout>
              <UpdateInventory />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory/fetch"
        element={
          <PrivateRoute>
            <MainLayout>
              <FetchAllInventory />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory/fetchone"
        element={
          <PrivateRoute>
            <MainLayout>
              <GetInventoryById />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory/delete"
        element={
          <PrivateRoute>
            <MainLayout>
              <DeleteInventory />
            </MainLayout>
          </PrivateRoute>
        }
      />
      {/*
      <Route
        path="/men"
        element={
          <PrivateRoute>
            <MainLayout>
              <Men />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/women"
        element={
          <PrivateRoute>
            <MainLayout>
              <Women />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/kids"
        element={
          <PrivateRoute>
            <MainLayout>
              <Kids />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <MainLayout>
              <Contact />
            </MainLayout>
          </PrivateRoute>
        }
      />
      */}
    </Routes>
    </Router>
  );
};

export default App;


