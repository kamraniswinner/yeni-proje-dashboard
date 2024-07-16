import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInventory } from '../actions/inventoryActions';
import styled from 'styled-components';

const FormContainer = styled.div`
  position: absolute;
  top: 60px;
  left: 280px;
  width: calc(100% - 280px);
  height: calc(100% - 60px);
  max-width: 60vw;
  margin-left: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 100px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 60%;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  text-align: center;
  color: ${(props) => props.color || 'black'};
`;

const CreateInventory = () => {
  const [productNumber, setProductNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [images, setImages] = useState([]); // Initialize as empty array
  const [stock, setStock] = useState('');
  const [batchNo, setBatchNo] = useState('');
  const [batchIncomingDate, setBatchIncomingDate] = useState('');

  const dispatch = useDispatch();

  const inventoryCreate = useSelector((state) => state.inventory) || {};
  const { loading, error, inventory } = inventoryCreate;

  useEffect(() => {
    if (images.length > 0) {
      console.log('Images selected:', images);
    }
  }, [images]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productNumber', productNumber);
    formData.append('productName', productName);
    formData.append('stock', stock);
    formData.append('batchNo', batchNo);
    formData.append('batchIncomingDate', batchIncomingDate);
    for (const image of images) {
      formData.append('images', image);
      console.log('Appending image:', image);
    }
    dispatch(createInventory(formData));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
  setImages((prevImages) => [...prevImages, ...newFiles]);
  };

  return (
    <FormContainer>
      <Title>Create Inventory Item</Title>
      {loading && <Message>Loading...</Message>}
      {error && <Message color="red">{error}</Message>}
      {inventory && <Message color="green">Inventory item created successfully!</Message>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Product Number</Label>
          <Input
            type="text"
            value={productNumber}
            onChange={(e) => setProductNumber(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Product Name</Label>
          <Input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Images</Label>
          <Input
            type="file"
            multiple
            onChange={handleImageChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Stock</Label>
          <Input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Batch Number</Label>
          <Input
            type="text"
            value={batchNo}
            onChange={(e) => setBatchNo(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Batch Incoming Date</Label>
          <Input
            type="date"
            value={batchIncomingDate}
            onChange={(e) => setBatchIncomingDate(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Create Inventory Item</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateInventory;
