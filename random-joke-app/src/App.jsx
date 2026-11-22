
import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    const searchUsername = username.trim();

    // Validate empty username
    if (!searchUsername) {
      setUser(null);
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(searchUsername)}`
      );

      if (response.status === 404) {
        throw new Error("User not found.");
      }

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      const data = await response.json();

      setUser(data);
    } catch (err) {
      setError(err.message || "Unable to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <section className="search-card">

          {/* Application Heading */}
          <h1>GitHub User Finder</h1>

          {/* Exact subtitle required by Cypress */}
          <p className="subtitle">
            Search a GitHub username to see profile details.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="username"
              placeholder="Enter GitHub username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          {/* Loading Message */}
          {loading && (
            <p className="loading-message">
              Loading user details...
            </p>
          )}

          {/* Initial Empty State */}
          {!user && !error && !loading && (
            <p className="empty-message">
              Search a GitHub username to see profile details.
            </p>
          )}

          {/* GitHub User Details */}
          {user && (
            <div className="user-card">

              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="user-avatar"
              />

              <h2>{user.name || user.login}</h2>

              <p className="username">
                @{user.login}
              </p>

              {user.bio && (
                <p className="user-bio">{user.bio}</p>
              )}

              {/* Location - Required by Test Case 3 */}
              {user.location && (
                <p className="user-location">
                  {user.location}
                </p>
              )}

              {/* Company */}
              {user.company && (
                <p className="user-company">
                  {user.company}
                </p>
              )}

              {/* Blog */}
              {user.blog && (
                <p className="user-blog">
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

              {/* GitHub Statistics */}
              <div className="user-details">

                <div className="detail-item">
                  <strong>{user.public_repos}</strong>
                  <span>Repositories</span>
                </div>

                <div className="detail-item">
                  <strong>{user.followers}</strong>
                  <span>Followers</span>
                </div>

                <div className="detail-item">
                  <strong>{user.following}</strong>
                  <span>Following</span>
                </div>

              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="profile-link"
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
