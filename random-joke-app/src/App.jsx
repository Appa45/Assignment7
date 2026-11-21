
import React, { useState, useRef } from 'react';

const JOKE_API =
  'https://official-joke-api.appspot.com/random_joke';

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Prevent multiple requests while one is running
  const requestInProgress = useRef(false);

 const fetchJoke = async () => {
  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch joke");
    }

    const data = await response.json();
    setJoke(data);
  } catch (error) {
    setError("Could not fetch a joke. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="page">
      <section className="joke-card" aria-labelledby="page-title">

        <div className="emoji" aria-hidden="true">
          😂
        </div>

        <h1 id="page-title">
          Random Joke Generator
        </h1>

        <p className="subtitle">
          Need a laugh? Fetch a random joke!
        </p>

        <div
          className="joke-content"
          aria-live="polite"
          aria-atomic="true"
        >
          {loading ? (
            <p className="status-message">
              Fetching a joke...
            </p>
          ) : error ? (
            <p className="error-message" role="alert">
              {error}
            </p>
          ) : joke ? (
            <div className="joke-text">
              <p className="setup">
                {joke.setup}
              </p>

              <p className="punchline">
                {joke.punchline}
              </p>
            </div>
          ) : (
            <p className="placeholder">
              Click the button to fetch a fresh one.
            </p>
          )}
        </div>

        <button onClick={fetchJoke} disabled={loading}>
  {loading ? "Fetching..." : "Fetch joke"}
</button>

      </section>
    </main>
  );
}
