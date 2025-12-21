const API_BASE_URL = 'http://localhost:5000'; // Change this to your backend URL

/**
 * API Service for User Management and Auth
 * Each function corresponds to the Express routes provided.
 */

// 1. GET Server Status (Health Check)
export const getServerStatus = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/`);
        return await response.text(); // Returns HTML string with uptime/memory
    } catch (error) {
        console.error("Status check failed:", error);
    }
};

// 2. POST /user - Create a new user
export const createUser = async (name, email, Password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, Password })
        });
        return await response.json();
    } catch (error) {
        console.error("Create user failed:", error);
    }
};

// 3. GET /user - Get all users
export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/user`);
        return await response.json();
    } catch (error) {
        console.error("Fetch users failed:", error);
    }
};

// 4. GET /user/:id - Get specific user
export const getUserById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${id}`);
        return await response.json();
    } catch (error) {
        console.error("Fetch user failed:", error);
    }
};

// 5. PUT /user/:id - Update user data
export const updateUser = async (id, name, email, Password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, Password })
        });
        return await response.json();
    } catch (error) {
        console.error("Update user failed:", error);
    }
};

// 6. DELETE /user/:id - Delete a user
export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error("Delete user failed:", error);
    }
};

// 7. POST /login - User Login Authentication
export const loginUser = async (email, Password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, Password })
        });
        const result = await response.text();

        // Logic check based on backend response string
        if (result === "Login Success") {
            console.log("Authenticated successfully");
            return { success: true, message: result };
        } else {
            return { success: false, message: result };
        }
    } catch (error) {
        console.error("Login request failed:", error);
        return { success: false, message: error.message };
    }
};

/**
 * EXAMPLE USAGE IN UI COMPONENT:
 * 
 * import { loginUser, getAllUsers } from './api.js';
 * 
 * async function onLoginClick() {
 *    const res = await loginUser('test@mail.com', 'password123');
 *    if (res.success) {
 *        // Redirect user or update UI state
 *        alert("Welcome!");
 *    } else {
 *        alert("Error: " + res.message);
 *    }
 * }
 */
