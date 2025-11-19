import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authservice";
// Importar los nuevos componentes reutilizables
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
// Importar los estilos generales de las páginas de autenticación
import "../../styles/AuthPages.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Estado para mensajes de error
    const [loading, setLoading] = useState(false); // Estado para controlar el loading del botón
    const navigate = useNavigate();

    // Mensajes de validación más formales y cálidos
    const validateForm = () => {
        if (!email.trim()) {
            setError("Por favor, ingresa tu correo electrónico para continuar.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("El formato del correo electrónico no es válido. Por favor, verifica.");
            return false;
        }
        if (!password.trim()) {
            setError("La contraseña es un campo obligatorio. Por favor, ingresa tu clave.");
            return false;
        }
        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos
        setLoading(true); // Activar estado de carga

        if (!validateForm()) {
            setLoading(false); // Desactivar carga si la validación falla
            return;
        }

        try {
            const response = await loginUser({ email, password });

            if (response && response.accessToken) {
                localStorage.setItem("token", response.accessToken);
                localStorage.setItem("refresh", response.refreshToken);
                // Considera usar una notificación más sutil en lugar de alert
                // alert("¡Inicio de sesión exitoso! Te damos la bienvenida.");
                navigate("/"); // Redirigir a la página principal
            } else {
                // Esto podría ocurrir si handleResponse devuelve { success: true } pero sin tokens
                setError("Credenciales incorrectas o un error inesperado. Por favor, intenta de nuevo.");
            }
        } catch (err) {
            // handleResponse ahora lanza un Error con el mensaje del backend
            setError(err.message || "Ha ocurrido un error al iniciar sesión. Por favor, inténtalo más tarde.");
            console.error("Login error:", err);
        } finally {
            setLoading(false); // Desactivar estado de carga
        }
    };

    return (
        <div className="auth-page-container"> {/* Contenedor para centrar la tarjeta */}
            <Card>
                <h2>Bienvenido de nuevo</h2>
                <form onSubmit={handleLogin} className="auth-form-content"> {/* Clase para espaciado interno */}
                    <Input
                        id="email"
                        label="Correo Electrónico"
                        type="email"
                        placeholder="tu.correo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        error={error.includes("correo") || error.includes("Credenciales") ? error : ""} // Mostrar error específico del email
                    />
                    <Input
                        id="password"
                        label="Contraseña"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={error.includes("contraseña") || error.includes("Credenciales") ? error : ""} // Mostrar error específico de la contraseña
                    />
                    {/* Mostrar errores generales que no son específicos de un campo */}
                    {error && !error.includes("correo") && !error.includes("contraseña") && !error.includes("Credenciales") && (
                        <p className="error-message">{error}</p>
                    )}

                    <Button type="submit" loading={loading}>
                        Iniciar Sesión
                    </Button>
                </form>
                <p className="auth-link-text">
                    ¿Aún no tienes una cuenta? <Link to="/register" className="auth-link">Regístrate aquí</Link>
                </p>
            </Card>
        </div>
    );
}

export default Login;
