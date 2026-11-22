
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

    // Empty username validation
    if (!trimmedUsername) {
      setUser(null);
      setError("Please enter a username");
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
          throw new Error("User not found");
        }

        if (response.status === 403) {
          throw new Error("GitHub API rate limit exceeded. Try again later.");
        }

        throw new Error("Something went wrong. Please try again.");
      }

      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message || "Unable to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GitHub User Details</h1>
        <p>Search GitHub users and view their profile details.</p>
      </header>

      <main className="main-content">
        <section className="search-card">
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="username">GitHub Username</label>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter GitHub username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  if (error) setError("");
                }}
              />
            </div>

            <button
              type="submit"
              className="search-button"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </section>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {loading && (
          <p className="loading-message">Loading user details...</p>
        )}

        {user && (
          <section className="user-card">
            <div className="user-profile">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="user-avatar"
              />

              <div className="user-heading">
                <h2>{user.name || user.login}</h2>
                <p className="username">@{user.login}</p>

                {user.bio && <p className="user-bio">{user.bio}</p>}
              </div>
            </div>

            <div className="user-details">
              <div className="detail-item">
                <span>Repositories</span>
                <strong>{user.public_repos}</strong>
              </div>

              <div className="detail-item">
                <span>Followers</span>
                <strong>{user.followers}</strong>
              </div>

              <div className="detail-item">
                <span>Following</span>
                <strong>{user.following}</strong>
              </div>
            </div>

            <div className="additional-details">
              {user.location && (
                <p>
                  <strong>Location:</strong> {user.location}
                </p>
              )}

              {user.company && (
                <p>
                  <strong>Company:</strong> {user.company}
                </p>
              )}

              {user.blog && (
                <p>
                  <strong>Website:</strong>{" "}
                  <a
                    href={
                      user.blog.startsWith("http")
                        ? user.blog
                        : `https://${user.blog}`
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.blog}
                  </a>
                </p>
              )}

              {user.email && (
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
              )}
            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="profile-link"
            >
              View GitHub Profile
            </a>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
