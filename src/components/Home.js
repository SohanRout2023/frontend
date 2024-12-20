import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./UserProfile";

const query = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      content
      createdAt
      comments
      user {
        id
        name
        email
      }
    }
  }
`;

function Home() {
  const { data, loading, error } = useQuery(query);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <h2 className="loading">Loading todos...</h2>;
  if (error) return <h2 className="error">Error fetching todos: {error.message}</h2>;

  const filteredTodos = data.getTodos.filter(
    (todo) =>
      todo?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by User Name or Email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="todos-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Content</th>
            <th>Comments</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr key={todo.id} className="todo-row">
              <td>{todo?.user?.name || "N/A"}</td>
              <td>{todo?.user?.email || "N/A"}</td>
              <td>{todo.content}</td>
              <td>{todo.comments}</td>
              <td>{new Date(todo.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
