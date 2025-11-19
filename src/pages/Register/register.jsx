import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authservice";
// Importar los nuevos componentes reutilizables
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
// Importar los estilos generales de las páginas de autenticación
import "../../styles/AuthPages.css";

function Register() {
    const [form, setForm] = useState({
        Name: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    });
    const [error, setError] = useState(""); // Estado para mensajes de error
    const [success, setSuccess] = useState(""); // Estado para mensajes de éxito
    const [loading, setLoading] = useState(false); // Estado para controlar el loading del botón
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    // Mensajes de validación más formales y cálidos
    const validateForm = () => {
        if (!form.Name.trim()) {
            setError("El nombre es un campo obligatorio. Por favor, ingresa tu nombre.");
            return false;
        }
        if (!form.LastName.trim()) {
            setError("El apellido es un campo obligatorio. Por favor, ingresa tu apellido.");
            return false;
        }
        if (!form.Email.trim()) {
            setError("El correo electrónico es un campo obligatorio. Por favor, ingresa tu email.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(form.Email)) {
            setError("El formato del correo electrónico no es válido. Por favor, verifica.");
            return false;
        }
        if (!form.Password.trim()) {
            setError("La contraseña es un campo obligatorio. Por favor, ingresa una clave.");
            return false;
        }
        if (form.Password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres para mayor seguridad.");
            return false;
        }
        if (form.Password !== form.ConfirmPassword) {
            setError("Las contraseñas no coinciden. Por favor, asegúrate de que sean iguales.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos
        setSuccess(""); // Limpiar mensajes de éxito previos
        setLoading(true); // Activar estado de carga

        if (!validateForm()) {
            setLoading(false); // Desactivar carga si la validación falla
            return;
        }

        const data = {
            Name: form.Name,
            LastName: form.LastName,
            Email: form.Email,
            Password: form.Password
        };

        try {
            const response = await registerUser(data);

            if (response && response.success) {
                setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión con tus nuevas credenciales.");
                setTimeout(() => {
                    navigate("/login");
                }, 2500); // Dar un poco más de tiempo para leer el mensaje
            } else {
                setError("Ha ocurrido un error al registrarte. Por favor, intenta de nuevo.");
            }
        } catch (err) {
            setError(err.message || "Ha ocurrido un error inesperado al registrarte. Por favor, inténtalo más tarde.");
            console.error("Register error:", err);
        } finally {
            setLoading(false); // Desactivar estado de carga
        }
    };

    return (
        <div className="auth-page-container">
            <Card>
                <h2>Crea tu cuenta</h2>
                <form onSubmit={handleSubmit} className="auth-form-content">
                    <Input
                        id="Name"
                        label="Nombre"
                        type="text"
                        placeholder="Tu nombre"
                        value={form.Name}
                        onChange={handleChange}
                        required
                        error={error.includes("nombre") ? error : ""}
                    />
                    <Input
                        id="LastName"
                        label="Apellido"
                        type="text"
                        placeholder="Tu apellido"
                        value={form.LastName}
                        onChange={handleChange}
                        required
                        error={error.includes("apellido") ? error : ""}
                    />
                    <Input
                        id="Email"
                        label="Correo Electrónico"
                        type="email"
                        placeholder="tu.correo@ejemplo.com"
                        value={form.Email}
                        onChange={handleChange}
                        required
                        error={error.includes("correo") ? error : ""}
                    />
                    <Input
                        id="Password"
                        label="Contraseña"
                        type="password"
                        placeholder="Mínimo 6 caracteres"
                        value={form.Password}
                        onChange={handleChange}
                        required
                        error={error.includes("contraseña") && !error.includes("no coinciden") ? error : ""}
                    />
                    <Input
                        id="ConfirmPassword"
                        label="Confirmar Contraseña"
                        type="password"
                        placeholder="Repite tu contraseña"
                        value={form.ConfirmPassword}
                        onChange={handleChange}
                        required
                        error={error.includes("no coinciden") ? error : ""}
                    />
                    {/* Mostrar errores generales que no son específicos de un campo */}
                    {error && !error.includes("nombre") && !error.includes("apellido") && !error.includes("correo") && !error.includes("contraseña") && (
                        <p className="error-message">{error}</p>
                    )}
                    {success && <p className="success-message">{success}</p>}
                    <Button type="submit" loading={loading}>
                        Registrarme
                    </Button>
                </form>
                <p className="auth-link-text">
                    ¿Ya tienes una cuenta? <Link to="/login" className="auth-link">Inicia sesión aquí</Link>
                </p>
            </Card>
        </div>
    );
}

export default Register;
