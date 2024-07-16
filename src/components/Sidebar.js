// src/components/Sidebar.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SidebarContainer = styled.div`
  position: fixed;
  top: 60px; // height of the navbar
  left: 0;
  width: 250px;
  height: calc(100% - 60px); // height of the sidebar excluding the navbar
  background-color: #222;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: block;
  margin: 10px 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => (
  <SidebarContainer>
    <StyledLink to="/product">Manage Product</StyledLink>
    <StyledLink to="/inventory">Manage Inventory</StyledLink>
    <StyledLink to="/change-admin-role">Manage Orders</StyledLink>
  </SidebarContainer>
);

export default Sidebar;
