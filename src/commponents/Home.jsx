import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Modal, Navbar, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import "../styles/Home.css";
import Header from './Header';
import axios from 'axios';
import API_URL from '../config/global';
import { CreateNote } from './CreateNote';
import { useNavigate } from 'react-router-dom';
import { EditNode } from './EditNode';

export const Home = () => {
    const [user, setUser] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [editNote, setEditNote] = useState(false)
    const [notes, setNotes] = useState([])
    const [selectedNote, setSetselectedNote] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            getData(token)
        }
    }, [])

    const navigate = useNavigate()

    const getData = async (token) => {
        try {
            const config = {
                headers: { Authorizaition: token }
            }
            const response = await axios.get(`${API_URL}/home`, config);
            setUser(response.data)
            console.log(response);
        } catch (e) {
            console.log(e)
        }
    }

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`${API_URL}/api/notes`, {
                headers: { Authorization: token }
            });
            console.log(response);
            setNotes(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteNote = async (id) => {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                await axios.delete(`${API_URL}/api/notes/${id}`, {
                    headers: { Authorization: token }
                })
                fetchNotes(token);
            }
        } catch (error) {
            navigate("/home")
        }
    }
    useEffect(() => {
        fetchNotes()
    }, [])

    return (
        <><div className='home-container'>
            <Header user={user} />
            <Navbar className="bg-body justify-content-between home-navbar">
                <Button onClick={() => setOpenModal(true)}>Create</Button>
                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2" />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Navbar>
            {notes.length > 0 ?
                <ListGroup as="ol" numbered className='home-list'>
                    {notes.map((eachNote) => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{eachNote.title}</div>
                                {eachNote.content}
                            </div>
                            <Button variant="primary" onClick={() => { setEditNote(true); setSetselectedNote(eachNote._id) }}>Edit</Button>{' '}
                            <Button variant="danger" onClick={() => deleteNote(eachNote?._id)}>Delete</Button>{' '}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                :
                <span>You dont have any notes, create one!</span>
            }
        </div>
            <CreateNote openModal={openModal} setOpenModal={setOpenModal} />
            <EditNode selectedNote={selectedNote} editNote={editNote} setEditNote={setEditNote} />
        </>
    )
}
