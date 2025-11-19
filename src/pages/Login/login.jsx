import { useState } from "react";
import { loginUser } from "../../services/authservice";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await loginUser({ email, password });

        console.log(response);

        if (response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("refresh", response.refreshToken);
            alert("Login exitoso");
        } else {
            alert("Error al iniciar sesión");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
