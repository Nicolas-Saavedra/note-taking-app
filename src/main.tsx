import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { NotesProvider } from './contexts/useNotes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NotesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </NotesProvider> 
)
