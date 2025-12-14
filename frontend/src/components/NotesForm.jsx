import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const NoteForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/api/notes/${id}`)
        .then(response => {
          setFormData({
            title: response.data.data.title,
            content: response.data.data.content,
          });
          setLoading(false);
        })
        .catch(err => {
          setMessage('Error al cargar la nota para editar.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    if (!formData.title.trim()) {
      setMessage('El título es obligatorio, ¡no seas vago!');
      setLoading(false);
      return;
    }

    try {
      if (id) {
        await axios.put(`/api/notes/${id}`, formData);
        setMessage('Nota actualizada correctamente.');
      } else {
        await axios.post('/api/notes', formData);
        setMessage('Nota creada correctamente.');
      }
      
      setTimeout(() => navigate('/'), 1500); 

    } catch (err) {
        if (err.response && err.response.status === 422) {
            setMessage('Error de validación: El título es obligatorio.');
        } else {
            setMessage('Fallo en la conexión o el backend está KO.');
        }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) return <p>Cargando nota...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{id ? 'Editar Nota' : 'Crear Nueva Nota'}</h2>
      
      {message && (
        <p className={`p-3 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título (*)</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título de la nota"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-bold mb-2">Contenido (Opcional)</label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            placeholder="Contenido de la nota..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-150"
          >
            Volver
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md transition duration-150"
            disabled={loading}
          >
            {loading ? 'Guardando...' : id ? 'Actualizar Nota' : 'Crear Nota'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;