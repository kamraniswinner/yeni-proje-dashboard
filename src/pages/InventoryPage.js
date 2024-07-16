import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  flex: 1 1 45%; /* Adjust the width and spacing */
  max-width: 45%;

  &:hover {
    background-color: #0056b3;
  }
`;

const InventoryPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Title>Inventory Management</Title>
      <ButtonContainer>
        <Button onClick={() => navigate('/inventory/create')}>Create Inventory</Button>
        <Button onClick={() => navigate('/inventory/update')}>Update Inventory</Button>
        <Button onClick={() => navigate('/inventory/fetchone')}>Get Inventory</Button>
        <Button onClick={() => navigate('/inventory/fetch')}>Fetch All Inventory</Button>
        <Button onClick={() => navigate('/inventory/delete')}>Delete Inventory</Button>
      </ButtonContainer>
    </PageContainer>
  );
};

export default InventoryPage;
