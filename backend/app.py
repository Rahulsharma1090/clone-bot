from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from me import process_with_ai  # imported from your module

app = Flask(__name__)
CORS(app)

@app.route('/query', methods=['POST'])
def handle_query():
    data = request.json
    user_input = data.get("message", "")
    ai_response = process_with_ai(user_input)
    return jsonify({"reply": ai_response})

if __name__ == '__main__':
    app.run(debug=True)