import React, { useState } from 'react';
import apiService from './apiService.mjs'; // Import the service
import axios from 'axios';
import './App.css'

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      const aiResponse = await apiService.queryAI(query); // Use the service
      setResponse(aiResponse);
    } catch (error) {
      setError('An error occurred while contacting the AI service.'); // Display user-friendly error message
      console.error(error); // Log the full error for debugging
    }

    try {
      const result = await axios.post('/api/query', { query });
      setResponse(result.data.response);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred.'); // More specific error handling
      console.error("Error fetching data:", err); // Log for debugging
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Ask-Hercules AI Query Assistant</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50"
          disabled={isLoading || !query} // Disable if loading or query is empty
        >
          {isLoading ? 'Asking...' : 'Ask'}
        </button>
      </form>

      {isLoading && (
        <div className="text-center text-gray-500">Loading...</div>
      )}


      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}



      {response && (
        <div className="prose lg:prose-xl"> {/* Added prose class for better formatting */}
          <p>{response}</p>
        </div>
      )}



    </div>
  );
}


export default App;

