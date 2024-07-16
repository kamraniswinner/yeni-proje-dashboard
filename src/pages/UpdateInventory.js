import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInventory } from '../actions/inventoryActions';
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

const ImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UpdateInventory = () => {
  const [productNumber, setProductNumber] = useState('');
  const [formData, setFormData] = useState({
    productName: '',
    images: [],
    stock: 0,
    batchNo: '',
    batchIncomingDate: '',
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.inventory);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInventory(productNumber, formData));
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: [...formData.images, e.target.value] });
  };

  return (
    <Container>
      <Title>Update Inventory</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>ID:</Label>
          <Input type="text" value={productNumber} onChange={(e) => setProductNumber(e.target.value)} required />
        </div>
        <div>
          <Label>Product Name:</Label>
          <Input
            type="text"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Images:</Label>
          <Input type="text" onChange={handleImageChange} />
          <ImagesContainer>
            {formData.images.map((image, index) => (
              <p key={index}>{image}</p>
            ))}
          </ImagesContainer>
        </div>
        <div>
          <Label>Stock:</Label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Batch No:</Label>
          <Input
            type="text"
            value={formData.batchNo}
            onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
            required
          />
        </div>
        <div>
          <Label>Batch Incoming Date:</Label>
          <Input
            type="date"
            value={formData.batchIncomingDate}
            onChange={(e) => setFormData({ ...formData, batchIncomingDate: e.target.value })}
            required
          />
        </div>
        <Button type="submit" disabled={loading}>Update</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default UpdateInventory;
