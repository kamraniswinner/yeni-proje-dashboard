import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/productActions';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 280px;
  width: calc(100% - 280px);
  height: calc(100% - 60px);
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #555;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
`;

const ProductDetail = styled.p`
  margin: 5px 0;
  color: #555;
`;

const FetchAllProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container>
      <Title>Fetch All Products</Title>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <ProductList>
          {products.map(product => (
            <ProductItem key={product._id}>
              <ProductDetail>Product ID: {product.productId}</ProductDetail>
              <ProductDetail>Product Number: {product.productNumber}</ProductDetail>
              <ProductDetail>Product Name: {product.name}</ProductDetail>
              <ProductDetail>Product Description: {product.description}</ProductDetail>
              <ProductDetail>Images: {product.images.join(', ')}</ProductDetail>
              <ProductDetail>Stock: {product.stock}</ProductDetail>
            </ProductItem>
          ))}
        </ProductList>
      )}
    </Container>
  );
};

export default FetchAllProducts;
