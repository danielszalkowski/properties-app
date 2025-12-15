import { Routes, Route } from 'react-router-dom';
import NotesList from './components/NotesList'; 
import NoteForm from './components/NotesForm';
import NoteDetail from './components/NoteDetail';

function App() {
  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 App de Notas Laravel/React</h1>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/new" element={<NoteForm />} />
        <Route path="/edit/:id" element={<NoteForm />} />
        <Route path="/notes/:id" element={<NoteDetail />} /> {}
        <Route path="*" element={<h2 className="text-red-500">404 - No encontrado</h2>} />
      </Routes>
    </div>
  );
}
export default App;