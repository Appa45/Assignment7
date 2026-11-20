
import React, { useState } from 'react';

const JOKE_API = 'https://official-joke-api.appspot.com/random_joke';

export default function App() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJoke = async () => {
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(JOKE_API);

      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();

      if (
        !data ||
        typeof data.setup !== 'string' ||
        typeof data.punchline !== 'string'
      ) {
        throw new Error('Invalid joke response');
      }

      setJoke({
        setup: data.setup,
        punchline: data.punchline,
      });

      setError('');
    } catch (err) {
      setJoke(null);
      setError('Could not fetch a joke. Try again.');
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

        <h1 id="page-title">Random Joke Generator</h1>

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
              <p className="setup">{joke.setup}</p>
              <p className="punchline">{joke.punchline}</p>
            </div>
          ) : (
            <p className="placeholder">
              Click the button to fetch a fresh one.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={fetchJoke}
          disabled={loading}
        >
          {loading
            ? 'Fetching...'
            : error
              ? 'Try again'
              : 'Fetch joke'}
        </button>
      </section>
    </main>
  );
}
