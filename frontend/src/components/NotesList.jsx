import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchNotes = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/notes?q=${query}`);
      setNotes(response.data.data); 
    } catch (err) {
      setError('Error al cargar las notas, ¡falla el backend o la red!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que quieres borrar esta nota, tete?')) {
      try {
        await axios.delete(`/api/notes/${id}`);
        setNotes(notes.filter(note => note.id !== id)); 
      } catch (err) {
        alert('Fallo al borrar la nota. Mira la consola.');
      }
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotes(search);
  };

  if (loading && notes.length === 0) return <p>Cargando notas...</p>;
  if (error) return <p className="text-red-500 font-bold">{error}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {}
        <Link to="/new" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow">
          + Nueva Nota
        </Link>
        
        {}
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded-l-md w-64"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-md">
            Buscar
          </button>
        </form>
      </div>

      {notes.length === 0 && !loading && <p>No hay notas.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{note.content || 'Sin contenido'}</p>
            <div className="flex justify-end space-x-2">
              <Link
                to={`/edit/${note.id}`}
                className="text-sm bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-sm bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;