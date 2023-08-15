import { createContext, useContext } from 'react';
import { Note } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface NotesContextType {
    notes: Note[];
    addNote: (note: Note) => void;
    retrieveNote: (id: string) => Note | undefined
    removeNote: (id: string) => void;
    updateNote: (id: string, note: Note) => void;
}

const Context = createContext<NotesContextType | null>(null);

function useNotes() {
    const ctx = useContext(Context);
    
    if (!ctx) {
        throw new Error('useNotes must be used within a NotesProvider');
    }
    
    return ctx;
}

function NotesProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useLocalStorage<Note[]>([], 'notes');
    
    const addNote = (note: Note) => {
        setNotes([...notes, note]);
    };

    const retrieveNote = (id: string) => {
        return notes.find((note) => {
            return note.id === id
        })
    }
    
    const removeNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };
    
    const updateNote = (id: string, note: Note) => {
        setNotes(notes.map(n => n.id === id ? note : n));
    };
    
    return (
        <Context.Provider value={{ notes, addNote, retrieveNote, removeNote, updateNote }}>
            {children}
        </Context.Provider>
    );
}

export { NotesProvider, useNotes };