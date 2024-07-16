import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestAdminPasswordReset } from '../actions/adminActions';
import styled from 'styled-components';
import Formtitle from './Formtitle';

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


const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.admin);
  

  const handleSubmit = e => {
    e.preventDefault();
      dispatch(requestAdminPasswordReset(email));
      console.log('Email:', email);
  };

  return (
    <> 
    <Formtitle title="Password Reset" />
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Email:</Label>
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {error && <Error>{error}</Error>}
      </FormGroup>
      <Button type="submit" disabled={loading}>
        {loading ? 'Requesting reset...' : 'Request Password Reset'}
      </Button>
      {success && <SuccessMessage>Reset link sent successfully!</SuccessMessage>}
    </Form>
    </>
  );
};

export default PasswordResetForm;
