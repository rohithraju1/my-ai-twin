
"use client";

import { useState } from "react";

export default function Home() {
  const [style, setStyle] = useState("Normal You");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

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
          display: flex;
          flex-direction: column;
          max-width: 1000px;
          margin: auto;
          padding: 25px;
        }
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #263047;
          padding-bottom: 20px;
        }
        .logo { font-size: 25px; font-weight: bold; }
        .logo span { color: #a78bfa; }
        .status { color: #4ade80; font-size: 13px; }
        .intro { text-align: center; margin: 65px 0 30px; }
        .intro h1 { font-size: 38px; }
        .intro p { color: #9ca3af; }
        .styles {
          display: flex;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin: 25px 0;
        }
        button {
          cursor: pointer;
          border: 1px solid #374151;
          border-radius: 12px;
          padding: 12px 17px;
          background: #151c2d;
          color: white;
        }
        button.active {
          background: #7c3aed;
          border-color: #a78bfa;
        }
        .chat {
          flex: 1;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 15px 0;
        }
        .bubble {
          padding: 14px 18px;
          border-radius: 16px;
          max-width: 80%;
          line-height: 1.6;
          white-space: pre-wrap;
        }
        .user {
          align-self: flex-end;
          background: #6d45d9;
        }
        .bot {
          align-self: flex-start;
          background: #192337;
        }
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
        .send {
          background: #7c3aed;
          border: none;
        }
        footer {
          text-align: center;
          color: #6b7280;
          font-size: 12px;
          padding: 20px;
        }
        @media(max-width:600px) {
          .container { padding: 16px; }
          .intro h1 { font-size: 29px; }
        }
      `}</style>

      <header>
        <div className="logo">My AI <span>Twin ✨</span></div>
        <div className="status">● Your AI personality</div>
      </header>

      <section className="intro">
        <h1>Meet Your Digital Twin 👋</h1>
        <p>An AI that talks and responds just like you.</p>
      </section>

      <div className="styles">
        {["Normal You", "Professional You", "Full You"].map((s) => (
          <button
            key={s}
            className={style === s ? "active" : ""}
            onClick={() => setStyle(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <section className="chat">
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "#9ca3af", margin: "auto" }}>
            <h2>💬 Start a conversation</h2>
            <p>Your AI Twin is getting ready!</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`bubble ${m.role}`}>
            {m.text}
          </div>
        ))}
      </section>

      <form
        className="inputarea"
        onSubmit={(e) => {
          e.preventDefault();
          if (!message.trim()) return;
          setMessages([...messages, { role: "user", text: message }]);
          setMessage("");
        }}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message your AI Twin..."
        />
        <button className="send" type="submit">Send ➤</button>
      </form>

      <footer>My AI Twin · Your personality, powered by AI</footer>
    </main>
  );
}
