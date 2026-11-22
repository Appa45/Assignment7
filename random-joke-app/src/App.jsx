
import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    // Empty username validation - exact assessment text
    if (!trimmedUsername) {
      setUser(null);
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(trimmedUsername)}`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("User not found.");
        }

        throw new Error("Something went wrong. Please try again.");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <section className="search-card">
          <h1>GitHub User Finder</h1>

          <p className="subtitle">
            Search for any GitHub user and explore their profile.
          </p>

          <form onSubmit={handleSearch}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </form>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          {loading && (
            <p className="loading-message">
              Loading...
            </p>
          )}

          {!user && !error && !loading && (
            <p className="empty-message">
              Search for a GitHub user to see their details.
            </p>
          )}

        
{user && (
  <div className="user-card">
    <img
      src={user.avatar_url}
      alt={`${user.login} avatar`}
      className="user-avatar"
    />

    <h2>{user.name || user.login}</h2>

    <p className="username">@{user.login}</p>

    {user.bio && <p>{user.bio}</p>}

    {user.location && (
      <p className="user-location">
        {user.location}
      </p>
    )}

    {user.company && (
      <p>{user.company}</p>
    )}

    {user.blog && (
      <p>{user.blog}</p>
    )}

    {user-details-placeholder}

    <div className="user-details">
      <div>
        <strong>{user.public_repos}</strong>
        <span>Repositories</span>
      </div>

      <div>
        <strong>{user.followers}</strong>
        <span>Followers</span>
      </div>

      <div>
        <strong>{user.following}</strong>
        <span>Following</span>
      </div>
    </div>

    <a
      href={user.html_url}
      target="_blank"
      rel="noreferrer"
    >
      View GitHub Profile
    </a>
  </div>
)}

        </section>
      </main>
    </div>
  );
}

export default App;
