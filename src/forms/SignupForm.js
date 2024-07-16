import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminUser } from '../actions/adminActions';
import styled from 'styled-components';
import Formtitle from './Formtitle';
import { Link } from 'react-router-dom';

const NavLinks = styled.div`
  margin-top: 2rem;
  text-align: center;
  margin-bottom: 4rem;

  a {
    text-decoration: none;
    color: #007bff;

    &:hover {
      color: #0056b3;
    }
  }
`;

export const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const Error = styled.p`
  color: red;
  font-size: 0.8em;
  margin-top: 0.25rem;
`;

export const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export const SuccessMessage = styled.p`
  color: green;
  font-size: 0.9em;
  margin-top: 1rem;
`;

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:'productAdmin',
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.admin);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      dispatch(createAdminUser(formData.username, formData.email, formData.password, formData.role));
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  return (
    <> 
    <Formtitle title="Admin Signup Form" />
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Username:</Label>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <Error>{errors.username}</Error>}
      </FormGroup>
      <FormGroup>
        <Label>Email:</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <Error>{errors.email}</Error>}
      </FormGroup>
      <FormGroup>
        <Label>Password:</Label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <Error>{errors.password}</Error>}
      </FormGroup>
      <FormGroup>
        <Label>Confirm Password:</Label>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
      </FormGroup>
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating Admin User...' : 'Create Admin User'}
      </Button>
      {error && <Error>{error}</Error>}
      {success && <SuccessMessage>Admin user created successfully!</SuccessMessage>}
    </Form>
    <NavLinks>
    <h4>Already have an account?</h4>
    <Link to="/">Log In</Link>
    </NavLinks>
    </>
  );
};

export default SignupForm;
