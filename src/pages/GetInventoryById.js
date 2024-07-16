import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleInventory } from '../actions/inventoryActions';
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
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
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
  color: red;
  text-align: center;
`;

const InventoryDetails = styled.div`
  margin-top: 20px;
`;

const Detail = styled.p`
  color: #555;
`;

const GetInventoryById = () => {
  const [productNumber, setProductNumber] = useState('');
  const dispatch = useDispatch();
  const { inventoryItem, loading, error } = useSelector(state => state.inventory);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchSingleInventory(productNumber));
  };

  return (
    <Container>
      <Title>Get Inventory</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>ID:</Label>
          <Input type="text" value={productNumber} onChange={(e) => setProductNumber(e.target.value)} required />
        </FormGroup>
        <Button type="submit" disabled={loading}>Get</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
      {inventoryItem && (
        <InventoryDetails>
          <h3>Inventory Item</h3>
          <Detail>ID: {inventoryItem._id}</Detail>
          <Detail>Product Number: {inventoryItem.productNumber}</Detail>
          <Detail>Product Name: {inventoryItem.productName}</Detail>
          <Detail>Images: {inventoryItem.images.join(', ')}</Detail>
          <Detail>Stock: {inventoryItem.stock}</Detail>
          <Detail>Batch No: {inventoryItem.batchNo}</Detail>
          <Detail>Batch Incoming Date: {new Date(inventoryItem.batchIncomingDate).toLocaleDateString()}</Detail>
        </InventoryDetails>
      )}
    </Container>
  );
};

export default GetInventoryById;
