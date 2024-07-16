import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAdminPasswordReset } from '../actions/adminActions';
import styled from 'styled-components';

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

const ConfirmPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
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
      dispatch(confirmAdminPasswordReset(formData.password));
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>New Password:</Label>
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <Error>{errors.password}</Error>}
      </FormGroup>
      <FormGroup>
        <Label>Confirm New Password:</Label>
        <Input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
      </FormGroup>
      <Button type="submit" disabled={loading}>
        {loading ? 'Resetting password...' : 'Reset Password'}
      </Button>
      {error && <Error>{error}</Error>}
      {success && <SuccessMessage>Password reset successful!</SuccessMessage>}
    </Form>
  );
};

export default ConfirmPasswordForm;
