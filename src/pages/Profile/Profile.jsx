import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../services/authservice';
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import "../../styles/AuthPages.css";
import './Profile.css';

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

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
            });

            if (response && response.success) {
                setSuccessMessage('¡Tu perfil ha sido actualizado con éxito!');
                setIsEditing(false);
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

    // Generar iniciales para el avatar
    const initials = `${userData.name.charAt(0)}${userData.lastName.charAt(0)}`.toUpperCase();
    const fullName = `${userData.name} ${userData.lastName}`;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1 className="profile-title">Mi Perfil</h1>
                <p className="profile-subtitle">Gestiona tu información personal y preferencias</p>
            </div>

            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <Card className="profile-card">
                <div className="profile-info">
                    <Avatar 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`}
                        alt={fullName}
                        fallback={initials}
                        size="lg"
                    />
                    <div className="profile-details">
                        <h2 className="profile-name">{fullName}</h2>
                        <p className="profile-role">
                            {userData.role === 'Admin' ? 'Administrador' : 'Estudiante'} - {userData.email}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-row">
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
                    </div>

                    <div className="form-row">
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
                            value={userData.role === 'Admin' ? 'Administrador' : 'Usuario'}
                            disabled
                        />
                    </div>

                    <Input
                        id="id"
                        label="ID de Usuario"
                        type="text"
                        value={userData.id}
                        disabled
                    />

                    <div className="profile-actions">
                        {!isEditing ? (
                            <Button type="button" onClick={handleEditToggle} variant="secondary">
                                Editar Perfil
                            </Button>
                        ) : (
                            <>
                                <Button type="button" onClick={handleEditToggle} variant="ghost">
                                    Cancelar
                                </Button>
                                <Button type="submit" loading={loading} variant="primary">
                                    Guardar Cambios
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </Card>

            {/* Estadísticas de Uso */}
            <Card className="profile-stats-card">
                <h3 className="stats-title">Estadísticas de Uso</h3>
                <div className="stats-grid">
                    <div className="stat-item stat-primary">
                        <p className="stat-number">156</p>
                        <p className="stat-label">Consultas Ejecutadas</p>
                    </div>
                    <div className="stat-item stat-success">
                        <p className="stat-number">3</p>
                        <p className="stat-label">Bases de Datos Activas</p>
                    </div>
                    <div className="stat-item stat-warning">
                        <p className="stat-number">24h</p>
                        <p className="stat-label">Tiempo Total de Uso</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Profile;