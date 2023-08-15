import { Modal, Button, Stack } from "react-bootstrap";
import { useNotes } from "../../contexts/useNotes";
import { useEffect, useRef, useState } from "react";
import './ViewEditModal.css'

interface ViewEditModalProps {
    show: boolean;
    noteId: string | undefined;
    onHide: () => void;
}

function ViewEditModal({ show, noteId, onHide }: ViewEditModalProps) {

    const [ editMode, setEditMode ] = useState(false)
    const { removeNote, updateNote, retrieveNote } = useNotes()

    const note = retrieveNote(noteId!)

    const titleRef = useRef<HTMLInputElement | null>(null)
    const contentRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if (show === true) {
            setEditMode(false)
        }
    }, [show])

    function enterEditMode() {
        setEditMode(true)
    }

    function deleteNote() {
        removeNote(note!.id)
        onHide()
    }

    function saveNote() {
        updateNote(note!.id, {
            id: note!.id,
            title: titleRef!.current!.value,
            content: contentRef!.current!.value,
            createdAt: note!.createdAt,
            updatedAt: new Date().toLocaleDateString()
        })
        setEditMode(false)
    }

    function undoNote() {
        setEditMode(false)
        console.log('Leaving edit mode')
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                {editMode ? 
                (<Modal.Title 
                    as='input' 
                    onChange={() => {}} 
                    type="text" 
                    defaultValue={note?.title}
                    className="h4 border-none"
                    ref={titleRef}
                />) :
                (<Modal.Title>{note?.title}</Modal.Title>)}
            </Modal.Header>
            <Modal.Body>
                <Stack>
                    {editMode ? 
                    (<textarea 
                        cols={10} 
                        rows={5} 
                        defaultValue={note?.content}
                        className="border-none resizable-none"
                        ref={contentRef}
                    />) :
                    (<p>{note?.content}</p>)
                    }
                    <Stack direction="horizontal" className="mt-4">
                        <Button variant="success" className="me-3" onClick={
                            !editMode ? enterEditMode : saveNote}>
                            {!editMode ? 'Edit' : 'Save'}
                        </Button>
                        <Button variant="danger" onClick={
                            !editMode ? deleteNote : undoNote}>
                        {!editMode ? 'Delete' : 'Undo'}
                        </Button>
                    </Stack>
                </Stack>
            </Modal.Body>
        </Modal>
    )
}

export default ViewEditModal;