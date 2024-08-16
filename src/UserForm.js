import React, { useState } from "react";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const UserForm = ({ onAddUser }) => {
  const [userAddress, setUserAddress] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct the user object
      const newUser = {
        address: userAddress,
        email: userEmail,
        firstName: userFirstName,
        lastName: userLastName,
        password: userPassword,
      };

      // Send POST request to the backend
      const response = await axios.post(
        `${apiBaseUrl}/api/v1/createUser`,
        newUser
      );

      // Add the new user to the list of users
      onAddUser(response.data);

      // Clear form fields after successful submission
      setUserAddress("");
      setUserEmail("");
      setUserFirstName("");
      setUserLastName("");
      setUserPassword("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
        placeholder="Address"
      />
      <input
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={userFirstName}
        onChange={(e) => setUserFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={userLastName}
        onChange={(e) => setUserLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="password"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
