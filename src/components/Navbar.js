// src/components/Navbar.js
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../actions/adminActions'; // Adjust the path according to your project structure

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background-color: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavLogo = styled.div`
  display: flex;
  margin-left: 30px;
  padding: 0 10px;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 30px;
  
  &:hover {
    background-color: #ff1f3d;
  }
`;


const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(adminLogout());
  };

  return (
    <NavbarContainer>
      <NavLogo>Logo</NavLogo>
      <NavMenu>Menu</NavMenu>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
