import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import UserTable from "./UserTable";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const App = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/v1/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle adding users
  const handleAddUser = async (newUser) => {
    try {
      // Re-fetch users from the server to get the updated list
      await fetchUsers();
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      {/* Header */}
      <header>
        <h1>User Management System</h1>
      </header>

      {/* Body */}
      <div className="body-container">
        <UserForm onAddUser={handleAddUser} />
        <UserTable users={users} />
      </div>

      {/* Footer */}
      <footer>
        <p>&copy; 2024 Dricks simple project.</p>
      </footer>
    </div>
  );
};

export default App;
