import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

load_dotenv()
# 🔑 Use environment variables for security (set GEMINI_API_KEY before running)
client = genai.Client(api_key=os.getenv('Api_key'))

# 🧠 Load embedding model + vector DB
embedding_model = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")
db = Chroma(persist_directory="rahul_db", embedding_function=embedding_model)

# 🔍 Similarity search wrapper
def query_chroma(query: str) -> str:
    try:
        results = db.similarity_search(query, k=2)
        chunks = [doc.page_content for doc in results]
        prompt = "\n".join(chunks)
        prompt += "\n\nUse this information if helpful and respond in a casual—but not too informal—manner."
        return prompt
    except Exception as e:
        print(f"Telemetry capture failed: {e}")

# 🧠 Gemini tool description
query_chroma_function = {
    "name": "query_chroma",
    "description": "Finds facts about Rahul Sharma from his personal knowledge base.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The question you want to answer using Rahul's knowledge"
            }
        },
        "required": ["query"]
    }
}

# 🚀 AI agent logic
def process_with_ai(text):
    tools = types.Tool(function_declarations=[query_chroma_function])

    config = types.GenerateContentConfig(
        system_instruction="You are Rahul Sharma. Sound casual.",
        tools=[tools]
    )

    contents = [types.Content(role="user", parts=[types.Part(text=text)])]

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=contents,
        config=config
    )

    content_parts = response.candidates[0].content.parts

    if response.candidates[0].content.parts[0].function_call:
        function_call=response.candidates[0].content.parts[0].function_call
        if function_call.name == "query_chroma":
            query_text = function_call.args["query"]
            print(query_text)
            memory_response = query_chroma(query_text)

            followup_contents = [types.Content(role="user", parts=[types.Part(text=text)])]
            followup_config = types.GenerateContentConfig(
                system_instruction=(
                    "You are Rahul Sharma. Respond casually. You have some info about me in this prompt, "
                    "but focus on the query. If you don’t know the answer, say: 'Sorry, I can't tell you that.' "
                    f"Data about Rahul: {memory_response}"
                )
            )

            followup = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=followup_contents,
                config=followup_config
            )
            return followup.text
        else: return response.text

    return response.text