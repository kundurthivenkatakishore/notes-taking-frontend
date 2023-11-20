import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import "../styles/SignUp.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import API_URL from '../config/global.js';

const Login = ({ }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      const res = await axios.post(`${API_URL}/user/login`, {
        email: formData.email,
        password: formData.password
      })
      localStorage.setItem('token', res.data.token);
      navigate("/")
    } catch (err) {
      alert(err.msg)
    }
  }
  return (
    <Container className='signup-container'>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={formData.password} onChange={handleChange} name="password" placeholder="Password" />
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
        <p>Don't have an account? <Link to="/signup">SignUp</Link></p>
      </Form>
    </Container>
  );
}

export default Login;
