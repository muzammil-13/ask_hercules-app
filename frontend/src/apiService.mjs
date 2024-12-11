import axios from 'axios'; // ES module import

const apiService = {
    async queryAI(query) {  // Asynchronous function to query the AI
        try {
            const response = await axios.post('/api/query', { query }); // Send POST request
            return response.data.response; // Return the AI's response
        } catch (error) {
            console.error("API Error:", error); // Log the error
            throw error; // Re-throw the error for handling in the calling component
        }
    },

    async healthCheck() { // Asynchronous function for health check
        try {
            const response = await axios.get('/api/health'); // Send GET request
            return response.data;  // Return the health check response data
        } catch (error) {
            console.error("Health Check Error:", error);  // Log error
            throw error;  // Re-throw error
        }
    }
};

export default apiService; // ES module export
