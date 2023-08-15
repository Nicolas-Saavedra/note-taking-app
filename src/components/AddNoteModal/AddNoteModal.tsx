import { Button, Modal, Form } from "react-bootstrap";
import { useNotes } from "../../contexts/useNotes";
import React from "react";
import { v4 as uuid } from "uuid";

interface AddNoteModalProps {
    show: boolean;
    onHide: () => void;
}

function AddNoteModal({ show, onHide }: AddNoteModalProps) {

    const { addNote } = useNotes()
    const titleRef = React.useRef<HTMLInputElement>(null)
    const contentRef = React.useRef<HTMLTextAreaElement>(null)

    function handleAddNote() {
        addNote({
            id: uuid(),
            title: titleRef.current?.value || "New Note",
            content: contentRef.current?.value || "",
            createdAt: new Date().toLocaleDateString()
        })
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add Note</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault()
                    handleAddNote()
                }}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control ref={titleRef} type="text" placeholder="Enter title" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control ref={contentRef} as="textarea" rows={5} placeholder="Enter content" />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="primary" onClick={handleAddNote}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AddNoteModal;