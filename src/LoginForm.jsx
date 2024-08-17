import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const DoLogin = async (event) => {
    event.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'https://intern-task-api.bravo68web.workers.dev/auth/login',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data?.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);

        navigate('/products', { state: { email: email } });
      } else {
        setMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-light">
      <Form onSubmit={DoLogin} className="bg-secondary p-4 rounded shadow">
        <h2 className="text-center mb-4">Login</h2>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email:</Form.Label>
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
          <Form.Label>Password:</Form.Label>
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
          Login
        </Button>
        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </Form>
    </Container>
  );
}

export default LoginForm;
