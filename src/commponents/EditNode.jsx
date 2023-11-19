import React, { useEffect, useState } from 'react'
import API_URL from '../config/global'
import axios from 'axios'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const EditNode = ({ editNote, setEditNote, selectedNote }) => {
    const [note, setNote] = useState({
        title: '',
        content: '',
        id: ''
    })

    const navigate = useNavigate()
    useEffect(() => {
        const getNote = async () => {
            const token = localStorage.getItem('token')
            if (selectedNote) {
                const res = await axios.get(`${API_URL}/api/notes/${selectedNote}`, {
                    headers: { Authorization: token }
                })
                setNote({
                    title: res.data.title,
                    content: res.data.content,
                    id: res.data._id
                })
            }
        }
        getNote()
    }, [selectedNote])

    const handleChange = e => {
        const { name, value } = e.target;
        setNote({ ...note, [name]: value })
    }

    const editNoteHandler = async () => {
        console.log("Entered Here");
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const { title, content } = note;
                const newNote = {
                    title, content
                }

                await axios.put(`${API_URL}/api/notes/${selectedNote}`, newNote, {
                    headers: { Authorization: token }
                }).then((res) => {
                    alert(res.data.msg);
                    setEditNote(false)
                }).catch((err) => {
                    alert(err.data.msg);
                    setEditNote(false)
                })
            }
        } catch (err) {
            navigate("/home")
        }
    }

    return (
        <Modal show={editNote} onHide={() => setEditNote(false)}>
            <Modal.Header>
                <InputGroup className="mb-1">
                    <Form.Control
                        placeholder="Enter title"
                        name="title"
                        value={note.title}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Modal.Header>
            <Modal.Body>
                <InputGroup>
                    <Form.Control name="content" as="textarea" placeholder='Enter content' value={note.content} onChange={handleChange} aria-label="With textarea" />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setEditNote(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => editNoteHandler()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal >
    )
}
