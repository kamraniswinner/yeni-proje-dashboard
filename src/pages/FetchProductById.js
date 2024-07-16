import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../actions/productActions';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 280px;
  width: calc(100% - 280px);
  height: calc(100% - 60px);
  max-width: 600px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  margin-top: 5px;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 10px;
  color: red;
`;

const ProductDetails = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
`;

const ProductDetail = styled.p`
  margin: 5px 0;
  color: #555;
`;

const FetchProductById = () => {
  const [productNumber, setProductNumber] = useState('');
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(state => state.product);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct(productNumber));
  };

  return (
    <Container>
      <Title>Fetch Product By ID</Title>
      <Form onSubmit={handleSubmit}>
        <Label>ID:</Label>
        <Input type="text" value={productNumber} onChange={(e) => setProductNumber(e.target.value)} required />
        <Button type="submit" disabled={loading}>Fetch</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
      {product && (
        <ProductDetails>
          <h3>Product Details</h3>
          <ProductDetail>Product ID: {product._id}</ProductDetail>
          <ProductDetail>Product Number: {product.productNumber}</ProductDetail>
          <ProductDetail>Product Name: {product.productName}</ProductDetail>
          <ProductDetail>Images: {product.images.join(', ')}</ProductDetail>
          <ProductDetail>Stock: {product.stock}</ProductDetail>
          <ProductDetail>Batch No: {product.batchNo}</ProductDetail>
          <ProductDetail>Batch Incoming Date: {new Date(product.batchIncomingDate).toLocaleDateString()}</ProductDetail>
        </ProductDetails>
      )}
    </Container>
  );
};

export default FetchProductById;
