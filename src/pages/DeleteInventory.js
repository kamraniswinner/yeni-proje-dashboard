import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInventory } from '../actions/inventoryActions';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 60px;
  left: 280px;
  width: calc(100% - 280px);
  height: calc(100% - 60px);
  max-width: 500px;
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
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
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
  color: red;
`;

const DeleteInventory = () => {
  const [productNumber, setProductNumber] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.inventory);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteInventory(productNumber));
  };

  return (
    <Container>
      <Title>Delete Inventory</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>ID:</Label>
          <Input type="text" value={productNumber} onChange={(e) => setProductNumber(e.target.value)} required />
        </div>
        <Button type="submit" disabled={loading}>Delete</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default DeleteInventory;

