import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/quote');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setQuote(data.quote);
      setError(null);
    } catch (err) {
      setError('Failed to fetch quote. Make sure the backend server is running.');
      console.error('Error fetching quote:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Quote Generator</h1>
        <div className="quote-container">
          {isLoading ? (
            <p>Loading quote...</p>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <p>Is your Flask backend running at http://localhost:5001?</p>
            </div>
          ) : (
            <blockquote className="quote">
              <p>{quote}</p>
            </blockquote>
          )}
        </div>
        <button onClick={fetchQuote} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get New Quote'}
        </button>
      </header>
    </div>
  );
}

export default App;
