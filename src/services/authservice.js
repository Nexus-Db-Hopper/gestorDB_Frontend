const API_URL = "https://nexusbd-backend.onrender.com/api/Auth";

// Función auxiliar para manejar las respuestas de la API
const handleResponse = async (res) => {
    // Si la respuesta es exitosa (código 2xx)
    if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const jsonResponse = await res.json();
            // Si la respuesta JSON es una cadena, la envolvemos en un objeto con 'message'
            if (typeof jsonResponse === 'string') {
                return { success: true, message: jsonResponse };
            }
            // Si es un objeto, lo devolvemos con 'success: true'
            return { success: true, ...jsonResponse };
        }
        // Si no hay contenido JSON pero la respuesta es exitosa (ej. 201 Created, 204 No Content)
        return { success: true, status: res.status };
    } else {
        // Si la respuesta no es exitosa (código de error)
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const errorData = await res.json();
            throw new Error(errorData.detail || errorData.title || "Ocurrió un error en la API.");
        }
        throw new Error(`Error HTTP! Estado: ${res.status}`);
    }
};

export const registerUser = async (data) => {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return handleResponse(res);
};

export const loginUser = async (data) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return handleResponse(res);
};

export const refreshToken = async (refreshToken) => {
    const res = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken })
    });
    return handleResponse(res);
};

export const logoutUser = async () => { // No necesita 'token' como argumento si lo obtiene de localStorage
    const token = localStorage.getItem("token");
    if (!token) {
        return { success: true, message: "No hay token para cerrar sesión." };
    }
    const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return handleResponse(res);
};

// NUEVA FUNCIÓN: Obtener perfil del usuario
export const getProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No hay token de autenticación. Por favor, inicia sesión.");
    }
    const res = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });
    return handleResponse(res);
};

// NUEVA FUNCIÓN (tentativa): Actualizar perfil del usuario
export const updateProfile = async (profileData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No hay token de autenticación. Por favor, inicia sesión.");
    }
    const res = await fetch(`${API_URL}/profile`, {
        method: "PUT", // Asumiendo un método PUT para actualizar
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
    });
    return handleResponse(res);
};
