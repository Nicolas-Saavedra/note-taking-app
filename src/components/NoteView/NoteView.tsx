import { Card } from 'react-bootstrap';
import type { Note } from "../../types";
import { random } from 'random-seedable';
import { hashUUID } from '../../utils'

interface NoteViewProps {
    note: Note;
    onClick: () => void;
}

const CHAR_LIMIT = 100;
const MIN_HEIGHT = 175;
const BRIGHTNESS = 195;

function NoteView({ note, onClick }: NoteViewProps) {

    function generateRandomPastelColor() {
        random.seed = hashUUID(note.id);
        const randomColor = () => Math.round(random.float() * (255 - BRIGHTNESS) + BRIGHTNESS);
        const [red, green, blue] = [randomColor(), randomColor(), randomColor()];
    
        return `rgb(${red}, ${green}, ${blue})`;
    }
    

    return (
        <Card className='p-0' style={{
             minHeight: `${MIN_HEIGHT}px`,
             backgroundColor: generateRandomPastelColor()
             }} onClick={onClick}>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content.length > CHAR_LIMIT ? `${note.content.substring(0, CHAR_LIMIT)}...` : note.content}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Created at: {note.createdAt}</small><br />
                {note.updatedAt && (<small className="text-muted">Edited at: {note.updatedAt}</small>)}
            </Card.Footer>
        </Card>
    )
}

export default NoteView;