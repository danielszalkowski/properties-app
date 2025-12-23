import { Routes, Route } from 'react-router-dom';
import NotesList from './components/NotesList'; 
import NoteForm from './components/NotesForm';
import NoteDetail from './components/NoteDetail';
import Register from './components/Register';
import Login from './components/Login';
import PropertyList from './components/PropertyList';

function App() {
  return (
    <div className="w-full p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Propiedades</h1>
      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/new" element={<NoteForm />} />
        <Route path="/edit/:id" element={<NoteForm />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/properties" element={<PropertyList />} /> 
        {}
        <Route path="*" element={<h2 className="text-red-500">404 - No encontrado</h2>} />
      </Routes>
    </div>
  );
}
export default App;