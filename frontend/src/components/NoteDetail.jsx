import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NotesForm from './NotesForm';

const NoteDetail = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            navigate('/');
            return;
        }

        setLoading(true);
        axios.get(`/api/notes/${id}`)
            .then(response => {
                setNote(response.data.data);
                setError(null);
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    setError('Nota no encontrada (404).');
                } else {
                    setError('Error al cargar la nota. Fallo en el backend.');
                }
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, navigate]);

    if (loading) return <p className="text-center mt-8">Cargando detalles de la nota...</p>;
    if (error) return <p className="text-red-500 font-bold text-center mt-8">{error}</p>;
    if (!note) return null;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-4 border-b pb-2 text-gray-800">{note.title}</h1>
            
            <div className="whitespace-pre-wrap text-gray-700 mb-6 border p-4 rounded bg-gray-50">
                <p>{note.content || 'Esta nota no tiene contenido detallado.'}</p>
            </div>

            <div className="text-sm text-gray-500 mb-6 border-t pt-2">
                <p>Creada: {new Date(note.created_at).toLocaleString()}</p>
                <p>Actualizada: {new Date(note.updated_at).toLocaleString()}</p>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => navigate('/')} 
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                >
                    &larr; Volver al Listado
                </button>
                <button
                    onClick={() => navigate(`/edit/${note.id}`)} 
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition duration-150"
                >
                    Editar Nota
                </button>
            </div>
        </div>
    );
};

export default NoteDetail;