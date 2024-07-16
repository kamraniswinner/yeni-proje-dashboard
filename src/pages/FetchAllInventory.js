import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory } from '../actions/inventoryActions';
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

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #ddd;
`;

const ItemDetail = styled.p`
  margin: 5px 0;
  color: #555;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #555;
`;

const FetchAllInventory = () => {
  const dispatch = useDispatch();
  const { inventoryItems, loading, error } = useSelector(state => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <Container>
      <Title>Fetch All Inventory</Title>
      {loading ? <LoadingMessage>Loading...</LoadingMessage> : error ? <ErrorMessage>{error}</ErrorMessage> : (
        <List>
          {inventoryItems.map(item => (
            <ListItem key={item._id}>
              <ItemDetail>Product Id: {item._id}</ItemDetail>
              <ItemDetail>Product Number: {item.productNumber}</ItemDetail>
              <ItemDetail>Product Name: {item.productName}</ItemDetail>
              <ItemDetail>Images: {item.images.join(', ')}</ItemDetail>
              <ItemDetail>Stock: {item.stock}</ItemDetail>
              <ItemDetail>Batch No: {item.batchNo}</ItemDetail>
              <ItemDetail>Batch Incoming Date: {new Date(item.batchIncomingDate).toLocaleDateString()}</ItemDetail>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default FetchAllInventory;
