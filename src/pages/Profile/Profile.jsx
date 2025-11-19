import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/authservice';
// Importar los nuevos componentes reutilizables
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
// Importar los estilos generales de las páginas de autenticación para mensajes
import "../../styles/AuthPages.css";
import './Profile.css'; // Estilos específicos para el perfil

function Profile() {
    const [userData, setUserData] = useState({
        id: '',
        name: '',
        lastName: '',
        email: '',
        role: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                if (response && response.success) {
                    setUserData({
                        id: response.id || '',
                        name: response.name || '',
                        lastName: response.lastName || '',
                        email: response.email || '',
                        role: response.role || ''
                    });
                } else {
                    setError(response.message || 'No fue posible cargar tu perfil. Por favor, intenta de nuevo.');
                }
            } catch (err) {
                setError(err.message || 'Ha ocurrido un error al obtener tu perfil. Por favor, inténtalo más tarde.');
                console.error("Error al cargar perfil:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setError('');
        setSuccessMessage('');
        // Si se cancela la edición, recargar los datos originales (opcional, pero buena UX)
        if (isEditing) {
            setLoading(true); // Para que el useEffect se dispare de nuevo
            // Esto es una simplificación, en un caso real podrías guardar una copia de los datos originales
            // y restaurarlos aquí sin hacer otra llamada a la API.
            // Por ahora, simplemente reseteamos el estado de carga para que el useEffect se ejecute.
            // Opcional: fetchProfile(); // Llamar de nuevo para obtener los datos originales
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        // Validaciones de frontend
        if (!userData.name.trim()) {
            setError('El nombre es un campo obligatorio. Por favor, ingresa tu nombre.');
            setLoading(false);
            return;
        }
        if (!userData.lastName.trim()) {
            setError('El apellido es un campo obligatorio. Por favor, ingresa tu apellido.');
            setLoading(false);
            return;
        }

        try {
            const response = await updateProfile({
                name: userData.name,
                lastName: userData.lastName,
                // No enviamos email ni role si no son editables
            });

            if (response && response.success) {
                setSuccessMessage('¡Tu perfil ha sido actualizado con éxito!');
                setIsEditing(false); // Salir del modo edición
            } else {
                setError(response.message || 'Ha ocurrido un error al actualizar tu perfil. Por favor, intenta de nuevo.');
            }
        } catch (err) {
            setError(err.message || 'Ha ocurrido un error inesperado al actualizar tu perfil. Por favor, inténtalo más tarde.');
            console.error("Error al actualizar perfil:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="profile-loading">Cargando tu perfil, por favor espera...</div>;
    }

    return (
        <div className="profile-page-container"> {/* Contenedor para centrar la tarjeta */}
            <Card>
                <h2>Mi Perfil</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="profile-form-content">
                    <Input
                        id="id"
                        label="ID de Usuario"
                        type="text"
                        value={userData.id}
                        disabled
                    />
                    <Input
                        id="name"
                        label="Nombre"
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                        error={error.includes("nombre") ? error : ""}
                    />
                    <Input
                        id="lastName"
                        label="Apellido"
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        required
                        error={error.includes("apellido") ? error : ""}
                    />
                    <Input
                        id="email"
                        label="Correo Electrónico"
                        type="email"
                        value={userData.email}
                        disabled
                    />
                    <Input
                        id="role"
                        label="Rol"
                        type="text"
                        value={userData.role}
                        disabled
                    />

                    <div className="profile-actions">
                        {!isEditing ? (
                            <Button type="button" onClick={handleEditToggle} variant="secondary">
                                Editar Perfil
                            </Button>
                        ) : (
                            <>
                                <Button type="submit" loading={loading}>
                                    Guardar Cambios
                                </Button>
                                <Button type="button" onClick={handleEditToggle} variant="ghost">
                                    Cancelar
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default Profile;
