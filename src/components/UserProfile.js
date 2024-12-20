import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./UserProfile.css"; // Use the same CSS file as Home.css

const query = gql`
  query GetComments {
    getTodos {
      id
      user {
        id
        name
        email
        username
        phone
      }
      comments
    }
  }
`;

function UserProfile() {
  const { data, loading, error } = useQuery(query);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <h2 className="loading">Loading comments...</h2>;
  if (error) return <h2 className="error">Error fetching comments: {error.message}</h2>;

  // Filter rows based on search term (name or username)
  const filteredTodos = data.getTodos.filter(
    (todo) =>
      todo.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-profile-container">
      <h1 className="user-profile-heading">User Details</h1>
      <input
        type="text"
        className="user-profile-search-input"
        placeholder="Search by name or username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="user-profile-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr
              key={todo.id}
              className={
                todo.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                todo.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
                  ? "match"
                  : ""
              }
            >
              <td>{todo.user?.id || "N/A"}</td>
              <td>{todo.user?.name || "N/A"}</td>
              <td>{todo.user?.email || "N/A"}</td>
              <td>{todo.user?.username || "N/A"}</td>
              <td>{todo.user?.phone || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
