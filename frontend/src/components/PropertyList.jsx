import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        search: '',
        operation_type: '',
        property_type_id: '',
        min_price: '',
        max_price: '',
        min_surface_m2: '',
        max_surface_m2: '',
        zone_type: '',
        zone_id: '',
        per_page: 20
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        total: 0,
    });

    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            navigate('/login');
        } catch (err) {
            console.error('Error al cerrar sesión', err);
            navigate('/login');
        }
    };

    const fetchProperties = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== '')
            );

            const response = await axios.get('/api/properties/available-for-operations', {
                params: { page, ...activeFilters }
            });

            setProperties(response.data.data);
            const meta = response.data.meta;
            setPagination({
                currentPage: meta.current_page,
                lastPage: meta.last_page,
                total: meta.total,
            });
        } catch (err) {
            setError('Error al cargar las propiedades, tete.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties(1);
    }, []);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.lastPage) {
            fetchProperties(newPage);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchProperties(1);
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Inmuebles Disponibles</h1>
                <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-sm transition">
                    Cerrar Sesión
                </button>
            </div>

            {/* FORMULARIO ÚNICO DE FILTROS */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-200">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* Búsqueda principal (ahora usa filters.search) */}
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Búsqueda</label>
                        <input
                            type="text"
                            placeholder="Título, calle, REF..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Operación</label>
                        <select
                            value={filters.operation_type}
                            onChange={(e) => setFilters({ ...filters, operation_type: e.target.value })}
                            className="w-full p-2 border rounded-lg bg-white"
                        >
                            <option value="">Cualquier operación</option> {/* Opción para ver todo */}
                            <option value="sale">En Venta</option>
                            <option value="rent">En Alquiler</option>
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
                            {loading ? 'Buscando...' : 'Aplicar Filtros'}
                        </button>
                    </div>

                    {/* Fila de rangos */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio Mín</label>
                        <input type="number" value={filters.min_price} onChange={(e) => setFilters({ ...filters, min_price: e.target.value })} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Precio Máx</label>
                        <input type="number" value={filters.max_price} onChange={(e) => setFilters({ ...filters, max_price: e.target.value })} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">m² Mín</label>
                        <input type="number" value={filters.min_surface_m2} onChange={(e) => setFilters({ ...filters, min_surface_m2: e.target.value })} className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">m² Máx</label>
                        <input type="number" value={filters.max_surface_m2} onChange={(e) => setFilters({ ...filters, max_surface_m2: e.target.value })} className="w-full p-2 border rounded-lg" />
                    </div>
                </form>
                {/* CONTROL DE VISTA Y CONTEO */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 px-2 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-sm text-gray-500 mb-4 md:mb-0">
                        Mostrando <span className="font-bold text-blue-600">{properties.length}</span> de <span className="font-bold text-gray-800">{pagination.total}</span> propiedades disponibles
                    </div>

                    <div className="flex items-center space-x-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ver:</label>
                        <select
                            value={filters.per_page}
                            onChange={(e) => {
                                const val = e.target.value;
                                setFilters(prev => ({ ...prev, per_page: val }));
                                setTimeout(() => fetchProperties(1), 0);
                            }}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 outline-none transition-all"
                        >
                            <option value="10">10 resultados</option>
                            <option value="20">20 resultados</option>
                            <option value="30">30 resultados</option>
                            <option value="50">50 resultados</option>
                        </select>
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500 font-bold text-center mb-6 bg-red-50 p-4 rounded-lg">{error}</p>}

            {/* LISTADO Y PAGINACIÓN */}
            {loading && properties.length === 0 ? (
                <div className="text-center py-20 text-xl font-semibold text-gray-400">Cargando datos...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {properties.map((prop) => (
                            <div key={prop.id} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs font-bold uppercase px-3 py-1 bg-blue-50 text-blue-600 rounded-full">{prop.property_type.name}</span>
                                        <span className="text-xs font-mono text-gray-400">{prop.intern_reference}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">{prop.title}</h2>
                                    <p className="text-gray-500 text-sm mb-4 truncate">📍 {prop.address}</p>
                                    <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase font-semibold">
                                                {}
                                                {prop.operation_type === 'sale' ? 'Precio Venta' : 'Alquiler'}
                                            </p>
                                            <p className="text-2xl font-black text-green-600">
                                                {prop.price ? `${new Intl.NumberFormat('es-ES').format(prop.price)}€` : 'N/A'}
                                                {}
                                                {prop.operation_type === 'rent' && <span className="text-sm ml-1">/mes</span>}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-semibold">Superficie</p>
                                            <p className="font-bold text-gray-700">{prop.surface_m2} m²</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {pagination.lastPage > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-12">
                            <button onClick={() => handlePageChange(pagination.currentPage - 1)} disabled={pagination.currentPage === 1 || loading} className="px-6 py-2 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-600 disabled:opacity-30 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm">← Anterior</button>
                            <div className="bg-gray-100 px-4 py-2 rounded-xl"><span className="text-gray-600 font-bold">{pagination.currentPage} / {pagination.lastPage}</span></div>
                            <button onClick={() => handlePageChange(pagination.currentPage + 1)} disabled={pagination.currentPage === pagination.lastPage || loading} className="px-6 py-2 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-600 disabled:opacity-30 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm">Siguiente →</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default PropertyList;