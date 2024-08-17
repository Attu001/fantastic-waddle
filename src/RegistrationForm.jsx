import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function RegistrationForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submitRegistration = async (event) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'https://intern-task-api.bravo68web.workers.dev/auth/signup',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data?.data?.result === 'OK') {
        setMessage('Registration successful!');
        navigate('/login');
      } else {
        setMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || 'An error occurred'}`);
      } else {
        setMessage('An error occurred during registration.');
      }
    }
  };

  return (
    <Container fluid
     
     
      
    >
      <Form onSubmit={submitRegistration} className="bg-secondary p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 text-light">Register</h2>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label className="text-light">Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="bg-dark text-light border-0"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label className="text-light">Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="bg-dark text-light border-0"
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="w-100 mt-3"
        >
          Register
        </Button>
        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </Form>
    </Container>
  );
}

export default RegistrationForm;
