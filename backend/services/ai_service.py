import logging
from flask import Flask, request, jsonify
from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.callbacks import FileCallbackHandler
import os

app = Flask(__name__)

# Configure logging (more robust setup)
log_file = os.path.join(os.path.dirname(__file__), "ai_service.log")  # Log to a file
logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize the LLM (handle API key errors more gracefully)
try:
    llm = OpenAI(temperature=0.7)
except Exception as e:
    logger.critical(f"Failed to initialize OpenAI LLM: {e}")  # CRITICAL for startup failures
    exit(1)  # Terminate the application


@app.route('/api/query', methods=['POST'])
def ai_query():
    try:
        user_query = request.get_json().get('query')
        if not user_query:
            return jsonify({"error": "Missing 'query' parameter"}), 400  # No need to log this common case

        # Use a callback handler for LangChain logging (optional but recommended)
        callback_handler = FileCallbackHandler(os.path.join(os.path.dirname(__file__), "langchain.log"))
        llm_with_callback = llm.with_callback(callback_handler) # Use this instead of calling llm directly below


        prompt = PromptTemplate.from_template("Answer the following question: {question}")
        formatted_prompt = prompt.format(question=user_query)

        llm_response = llm_with_callback(formatted_prompt)  # Now with callback logging!


        # Log successful queries (consider removing sensitive user data in production)
        logger.info(f"Successfully processed query: {user_query}")


        return jsonify({"response": llm_response})


    except Exception as e:
        logger.error(f"Error processing query: {e}", exc_info=True) # Include exception details in logs
        return jsonify({"error": "An error occurred while processing your query."}), 500

if __name__ == '__main__':
    app.run(debug=True)

