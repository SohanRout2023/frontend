import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home"; // Import Home page component
import Comment from "./components/Comment"; // Import Comment page component
import UserProfile from "./components/UserProfile"; // Import UserProfile page component
import "./App.css"; // Your custom styles

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1 className="navbar-logo">Community-Feed</h1>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/comments">PostPage</Link></li>
            <li><Link to="/userprofile">User Profile</Link></li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comments" element={<Comment />} />
          <Route path="/userprofile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
