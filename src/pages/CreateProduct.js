import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import { fetchInventory, fetchSingleInventory } from '../actions/inventoryActions';
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

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical; /* Allows vertical resizing but not horizontal */
`;

const Select = styled.select`
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
  color: ${props => props.color || 'black'};
`;

const InventoryList = styled.div`
  max-height: 200px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const InventoryItem = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
`;

const ImageItem = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: ${props => (props.selected ? '2px solid blue' : '1px solid #ccc')};

  &:hover {
    opacity: 0.8;
  }
`;

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [productNumber, setProductNumber] = useState('');
  const [inventoryImages, setInventoryImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const dispatch = useDispatch();

  const productCreate = useSelector(state => state.product);
  const { loading, error, product } = productCreate;

  const inventoryList = useSelector(state => state.inventory);
  const { inventoryItems } = inventoryList;

  const singleInventory = useSelector(state => state.inventory);
  const { inventoryItem } = singleInventory;

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  useEffect(() => {
    if (inventoryItem) {
      setProductNumber(inventoryItem.productNumber);
      setName(inventoryItem.productName);
      setInventoryImages(inventoryItem.images);
    }
  }, [inventoryItem]);

  useEffect(() => {
    console.log('Selected Images:', selectedImages);
  }, [selectedImages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      productId: inventoryItem._id,
      productNumber,
      name,
      description,
      price,
      images: selectedImages,
      gender,
      category,
      stock: inventoryItem.stock, // Add stock from inventoryItem to newProduct
    };
    console.log('New Product:', newProduct); // Log the new product data
    dispatch(createProduct(newProduct));
  };

  const handleInventorySelect = (id) => {
    dispatch(fetchSingleInventory(id));
  };

  const handleImageSelect = (img) => {
    if (selectedImages.includes(img)) {
      setSelectedImages(selectedImages.filter(image => image !== img));
    } else {
      setSelectedImages([...selectedImages, img]);
    }
  };

  return (
    <FormContainer>
      <Title>Create Product</Title>
      {loading && <Message>Loading...</Message>}
      {error && <Message color="red">{error}</Message>}
      {product && <Message color="green">Product created successfully!</Message>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Select Inventory Item</Label>
          <InventoryList>
            {inventoryItems.map((item) => (
              <InventoryItem key={item._id} onClick={() => handleInventorySelect(item._id)}>
                {item.productName}
              </InventoryItem>
            ))}
          </InventoryList>
        </FormGroup>
        <FormGroup>
          <Label>Select Images from Inventory</Label>
          <ImageGrid>
            {inventoryImages.map((img) => (
              <ImageItem
                key={img}
                src={img}
                alt="Inventory Image"
                onClick={() => handleImageSelect(img)}
                selected={selectedImages.includes(img)}
              />
            ))}
          </ImageGrid>
        </FormGroup>
        <FormGroup>
          <Label>Product Number</Label>
          <Input type="text" value={productNumber} readOnly />
        </FormGroup>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="5"
          />
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Gender</Label>
          <Select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Category</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
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
        </FormGroup>
        <Button type="submit">Create Product</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateProduct;
