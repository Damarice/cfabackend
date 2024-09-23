// pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state

    try {
      const response = await axios.post('/api/subscribe', { email });
      setMessage(response.data.message);
    } catch (error) {
      // Handle error responses
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1>Subscribe to Our Newsletter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
        <button type="submit" disabled={loading}> {/* Disable button while loading */}
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
