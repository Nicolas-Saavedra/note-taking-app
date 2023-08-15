import { Stack, Button, Container, Row, Col } from 'react-bootstrap'
import './App.css'
import { useNotes } from './contexts/useNotes'
import type { Note } from './types'
import NoteView from './components/NoteView'
import AddNoteModal from './components/AddNoteModal'
import { useState } from 'react'
import ViewEditModal from './components/ViewEditModal'

function App() {

  const [ showAddNoteModal, setShowAddNoteModal ] = useState(false)
  const [ showViewEditModal, setShowViewEditModal ] = useState(false)
  const [ currentNote, setCurrentNote ] = useState<Note | null>(null)
  const { notes } = useNotes()

  const notesPerGroup = 3;
  let groupedNotes: Note[][] = [];

  notes.forEach((note, index) => {
    if (index % notesPerGroup === 0) {
      groupedNotes.push([]);
    }
    groupedNotes[groupedNotes.length - 1].push(note);
  });

  function handleNoteClick(note: Note) {
    return () => {
      setCurrentNote(note)
      setShowViewEditModal(true)
    }
  }

  return (
    <>
      <Stack direction='horizontal'>
        <h1>Note-taking App</h1>
        <Button className='ms-auto' onClick={() => setShowAddNoteModal(true)}>Add Note</Button>
      </Stack>
      <Container className='mt-5'>
        {groupedNotes.map((group, index) => (
          <Row key={index} className='mb-4'>
            {group.map((note, index) => (
              <Col key={index} sm={4}>
                <NoteView note={note} onClick={handleNoteClick(note)}/>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
      <AddNoteModal show={showAddNoteModal} onHide={() => setShowAddNoteModal(false)}/>
      <ViewEditModal show={showViewEditModal} noteId={currentNote?.id} onHide={() => setShowViewEditModal(false)}/>
    </>
  )
}

export default App
