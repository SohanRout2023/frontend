import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import "./Home.css"; // Use the same CSS as Home.css

// GraphQL query to fetch comments with user details
const POST_QUERY = gql`
  query GetComments {
    getTodos {
      id
      user {
        id
        name
        email
      }
      comments
    }
  }
`;

const Comment = () => {
  const { data, loading, error } = useQuery(POST_QUERY);
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <h2 className="loading">Loading comments...</h2>;
  if (error) return <h2 className="error">Error fetching comments: {error.message}</h2>;

  const filteredTodos = data.getTodos.filter((todo) =>
    todo.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1 className="comments-heading">Post Details</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="todos-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo) => (
            <tr
              key={todo.id}
              className={todo.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ? "match" : ""}
            >
              <td>{todo.user?.id || "N/A"}</td>
              <td>{todo.user?.name || "N/A"}</td>
              <td>{todo.user?.email || "N/A"}</td>
              <td>{todo.comments || "No comments available"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Comment;
