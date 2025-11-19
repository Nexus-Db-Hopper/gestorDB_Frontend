import { useState } from "react";
import { registerUser } from "../../services/authservice";

function Register() {
    const [form, setForm] = useState({
        Name: "",
        LastName: "",
        Email: "",
        Password: "",
        ConfirmPassword: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Opcional: Validación rápida
        if (form.Password !== form.ConfirmPassword) {
            console.log("Passwords do not match");
            return;
        }

        // Lo que se envía al backend
        const data = {
            Name: form.Name,
            LastName: form.LastName,
            Email: form.Email,
            Password: form.Password
        };

        const res = await registerUser(data);
        console.log(res);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                onChange={e => setForm({ ...form, Name: e.target.value })}
            />

            <input
                type="text"
                placeholder="Last Name"
                onChange={e => setForm({ ...form, LastName: e.target.value })}
            />

            <input
                type="email"
                placeholder="Email"
                onChange={e => setForm({ ...form, Email: e.target.value })}
            />

            <input
                type="password"
                placeholder="Password"
                onChange={e => setForm({ ...form, Password: e.target.value })}
            />

            <input
                type="password"
                placeholder="Confirm Password"
                onChange={e => setForm({ ...form, ConfirmPassword: e.target.value })}
            />

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
