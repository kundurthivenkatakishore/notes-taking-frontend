import axios from 'axios';
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import API_URL from "../config/global"

export const CreateNote = ({ openModal, setOpenModal }) => {
    const [noteData, setNoteData] = useState({
        title: "",
        content: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNoteData({ ...noteData, [name]: value })
    }

    const navigate = useNavigate()
    const createNote = async () => {
        console.log("Entered Here");
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const { title, content } = noteData;
                const newNote = {
                    title, content
                }

                await axios.post(`${API_URL}/api/notes/create`, newNote, {
                    headers: { Authorization: token }
                }).then((res) => {
                    alert(res.data.msg);
                    setOpenModal(false);
                    setNoteData({ titlt: '', content: '' })
                }).catch((err) => {
                    console.log(err.msg);
                    setOpenModal(false)
                })

            }
        } catch (err) {
            navigate("/")
        }
    }
    return (
        <Modal show={openModal} onHide={() => setOpenModal(false)}>
            <Modal.Header>
                <InputGroup className="mb-1">
                    <Form.Control
                        placeholder="Enter title"
                        name="title"
                        onChange={handleChange}
                    />
                </InputGroup>
            </Modal.Header>
            <Modal.Body>
                <InputGroup>
                    <Form.Control name="content" as="textarea" placeholder='Enter content' onChange={handleChange} aria-label="With textarea" />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setOpenModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => createNote()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal >
    )
}
