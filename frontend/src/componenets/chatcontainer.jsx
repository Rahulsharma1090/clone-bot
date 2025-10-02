import React, { useState } from "react";

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
  if (input.trim() === "") return;

  // Show user message immediately
  setMessages(prev => [...prev, { sender: "user", text: input }]);

  // Send query to Flask backend
  try {
    const res = await fetch("http://localhost:5000/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    // Show bot response
    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
  } catch (err) {
    setMessages(prev => [...prev, { sender: "bot", text: "⚠️ Failed to fetch response." }]);
    console.error("Error querying backend:", err);
  }

  setInput(""); // Clear input box
};

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "90vh",
      maxWidth: "600px",
      margin: "auto",
      border: "1px solid #ccc",
      borderRadius: "8px",
      overflow: "hidden",
      backgroundColor: "#f6f3f3ff"
    }}>
      <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: "0.5rem" }}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", padding: "1rem", backgroundColor: "#fff" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
        <button
          onClick={handleSend}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatContainer;