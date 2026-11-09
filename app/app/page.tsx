
"use client";

import { useState } from "react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function Home() {
  const [style, setStyle] = useState("Normal You");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    const text = message.trim();
    if (!text || loading) return;

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", text },
    ];

    setMessages(updatedMessages);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
          style,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages([
        ...updatedMessages,
        { role: "bot", text: data.reply },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to connect to AI.";

      setMessages([
        ...updatedMessages,
        { role: "bot", text: "Sorry! " + errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <style jsx global>{`
        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: #090d18;
          color: white;
          font-family: Arial, sans-serif;
        }
        .container {
          min-height: 100vh;
          max-width: 1000px;
          margin: auto;
          padding: 25px;
          display: flex;
          flex-direction: column;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #263047;
          padding-bottom: 20px;
        }
        .logo { font-size: 25px; font-weight: bold; }
        .logo span { color: #a78bfa; }
        .status { color: #4ade80; font-size: 13px; }
        .intro { text-align: center; margin: 45px 0 25px; }
        .intro h1 { font-size: 36px; }
        .intro p { color: #9ca3af; }
        .styles {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin: 20px 0;
        }
        button {
          cursor: pointer;
          border: 1px solid #374151;
          border-radius: 12px;
          padding: 12px 17px;
          background: #151c2d;
          color: white;
        }
        button.active, .send {
          background: #7c3aed;
          border-color: #a78bfa;
        }
        button:disabled { opacity: .5; cursor: not-allowed; }
        .chat {
          flex: 1;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 15px 0;
        }
        .bubble {
          padding: 14px 18px;
          border-radius: 16px;
          max-width: 85%;
          line-height: 1.6;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }
        .user { align-self: flex-end; background: #6d45d9; }
        .bot { align-self: flex-start; background: #192337; }
        .inputarea {
          display: flex;
          gap: 10px;
          background: #151c2d;
          border: 1px solid #374151;
          padding: 10px;
          border-radius: 16px;
          margin-top: 20px;
        }
        input {
          flex: 1;
          min-width: 0;
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 16px;
          padding: 10px;
        }
        footer {
          text-align: center;
          color: #6b7280;
          font-size: 12px;
          padding: 20px;
        }
        @media(max-width:600px) {
          .container { padding: 16px; }
          .intro h1 { font-size: 28px; }
        }
      `}</style>

      <header>
        <div className="logo">
          My AI <span>Twin ✨</span>
        </div>
        <div className="status">● AI Assistant</div>
      </header>

      <section className="intro">
        <h1>Meet Your Digital Twin 👋</h1>
        <p>An AI that talks like you.</p>
      </section>

      <div className="styles">
        {["Normal You", "Professional You", "Full You"].map((s) => (
          <button
            key={s}
            className={style === s ? "active" : ""}
            onClick={() => setStyle(s)}
            disabled={loading}
          >
            {s}
          </button>
        ))}
      </div>

      <section className="chat">
        {messages.length === 0 && (
          <div style={{
            textAlign: "center",
            color: "#9ca3af",
            margin: "auto"
          }}>
            <h2>💬 Start a conversation</h2>
            <p>Your AI Twin is ready!</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.text}
          </div>
        ))}

        {loading && (
          <div className="bubble bot">
            Your AI Twin is typing... ✨
          </div>
        )}
      </section>

      <form className="inputarea" onSubmit={sendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message your AI Twin..."
          disabled={loading}
        />
        <button
          className="send"
          type="submit"
          disabled={loading || !message.trim()}
        >
          {loading ? "..." : "Send ➤"}
        </button>
      </form>

      <footer>
        My AI Twin · Your personality, powered by AI
      </footer>
    </main>
  );
}
