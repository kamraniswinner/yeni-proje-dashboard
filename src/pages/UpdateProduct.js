import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct, fetchProduct } from '../actions/productActions';
import { fetchSingleInventorybyproductnumber } from '../actions/inventoryActions';
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

const Label = styled.label`
  margin-top: 10px;
  color: #555;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-top: 20px;
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
  margin-top: 10px;
`;

const ImagesContainer = styled.div`
  margin-top: 10px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
  border: ${props => (props.selected ? '2px solid blue' : '1px solid #ccc')};

  &:hover {
    opacity: 0.8;
  }
`;

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    productName: '',
    images: [],
    stock: 0,
    batchNo: '',
    batchIncomingDate: '',
    category: '',
  });

  const [productNumber, setProductNumber] = useState('');
  const [inventoryImages, setInventoryImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const dispatch = useDispatch();
  const { loading, error, product } = useSelector(state => state.product);
  const { inventoryItem, error: inventoryError } = useSelector(state => state.inventory);

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || '',
        images: product.images || [],
        stock: product.stock || 0,
        batchNo: product.batchNo || '',
        batchIncomingDate: product.batchIncomingDate || '',
        category: product.category || '',
      });
      setSelectedImages(product.images || []);
    }
  }, [product]);

  useEffect(() => {
    if (inventoryItem && Array.isArray(inventoryItem)) {
      setInventoryImages(inventoryItem.flatMap(item => item.images));
    }
  }, [inventoryItem]);

  const handleFetchDetails = () => {
    if (productNumber) {
      dispatch(fetchSingleInventorybyproductnumber(productNumber));
      dispatch(fetchProduct(productNumber));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct(productNumber, { ...formData, images: selectedImages }));
  };

  const handleImageSelect = (img) => {
    if (selectedImages.includes(img)) {
      setSelectedImages(selectedImages.filter(image => image !== img));
    } else {
      setSelectedImages([...selectedImages, img]);
    }
  };

  return (
    <Container>
      <Title>Update Product</Title>
      <Label>Enter Product Number:</Label>
      <Input type="text" value={productNumber} onChange={(e) => setProductNumber(e.target.value)} required />
      <Button onClick={handleFetchDetails}>Fetch Details</Button>
      <Form onSubmit={handleSubmit}>
        <Label>Product Name:</Label>
        <Input
          type="text"
          value={formData.productName}
          onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
          required
        />

        <Label>Category:</Label>
        <Select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="select">Select</option>
          <option value="ring">Ring</option>
          <option value="earring">Earring</option>
          <option value="pendant">Pendant</option>
          <option value="bracelet">Bracelet</option>
          <option value="bangles">Bangles</option>
          <option value="amulet">Amulet</option>
          <option value="anklet">Anklet</option>
          <option value="nose-piercing">Nose Piercing</option>
          <option value="tika-set">Tika Set</option>
          <option value="accessories">Accessories</option>
          <option value="parfum">Parfum</option>
        </Select>

        <Label>Images:</Label>
        {inventoryError ? (
          <ErrorMessage>{inventoryError}</ErrorMessage>
        ) : (
          <ImagesContainer>
            {inventoryImages.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt="inventory"
                onClick={() => handleImageSelect(img)}
                selected={selectedImages.includes(img)}
              />
            ))}
          </ImagesContainer>
        )}

        <Label>Stock:</Label>
        <Input
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          required
        />

        <Label>Batch No:</Label>
        <Input
          type="text"
          value={formData.batchNo}
          onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
          required
        />

        <Label>Batch Incoming Date:</Label>
        <Input
          type="date"
          value={formData.batchIncomingDate}
          onChange={(e) => setFormData({ ...formData, batchIncomingDate: e.target.value })}
          required
        />

        <Button type="submit" disabled={loading}>Update</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

export default UpdateProduct;
