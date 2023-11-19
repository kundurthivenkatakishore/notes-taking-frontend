import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';
import "../styles/SignUp.css"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { Alert } from '../commponents/Alert';
import API_URL from '../config/global.js';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    try {
      const res = await axios.post(`${API_URL}/user/signup`, { formData });
      console.log(res);
      setFormData({ name: '', email: '', password: '' })
      Alert('primary', 'Signup Success')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Container className='signup-container'>
      <h1>SignUp</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        </Form.Group>
        <Button className='signup-button' variant='primary' type='submit'>SignUp</Button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </Form>
    </Container>
  );
}

export default Signup;