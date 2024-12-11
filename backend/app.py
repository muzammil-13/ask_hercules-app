from flask import Flask, jsonify
from dotenv import load_dotenv
from flask_cors import CORS  # Import CORS
import logging
import os

# ... (Your existing imports and AI service code remain here)
load_dotenv

openai_api_key=os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

# Configure CORS (Allow requests from any origin - adjust for production)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Apply CORS to /api/* routes

# Configure logging
# ... (Your existing logging configuration remains here)


@app.route('/api/health', methods=['GET'])  # Health check endpoint
def health_check():
    return jsonify({"status": "OK"}), 200



@app.errorhandler(404)  # Custom 404 error handler
def not_found(error):
    return jsonify({"error": "Not Found"}), 404



@app.errorhandler(Exception)  # Generic error handler
def handle_exception(e):
    logger.error(f"An unexpected error occurred: {e}", exc_info=True)
    return jsonify({"error": "Internal Server Error"}), 500  # Generic message for security



# ... (Your existing /api/query route and AI service code remain here)

if __name__ == '__main__':
    app.run(debug=True)

