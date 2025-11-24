import { useEffect, useState } from "react";
import { getInstances } from "../../../services/instanceservice";
import "./AdminDashboard.css";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const instances = await getInstances();

        // Extraer usuarios únicos por ID
        const uniqueUsers = [];
        const seen = new Set();

        instances.forEach(inst => {
          if (!seen.has(inst.ownerUserId)) {
            seen.add(inst.ownerUserId);
            uniqueUsers.push({
              id: inst.ownerUserId,
              name: inst.ownerUserName || "Unknown",
            });
          }
        });

        setUsers(uniqueUsers);
      } catch (err) {
        console.error("Error loading users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="page-container">
      <h1>Users List</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="user-list">
          {users.map(user => (
            <li key={user.id} className="user-item">
              <strong>ID:</strong> {user.id} — {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
