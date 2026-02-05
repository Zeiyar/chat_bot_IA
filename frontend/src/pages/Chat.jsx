import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

export default function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    const res = await fetch(
      `http://localhost:8000/chats/${chatId}/messages`,
      { credentials: "include" }
    );
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  }

  async function sendMessage(content) {
    // optimistic UI
    const tempMessage = {
      id: "temp-" + Date.now(),
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    setMessages(prev => [...prev, tempMessage]);

    await fetch(
      `http://localhost:8000/chats/${chatId}/messages`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    loadMessages(); // sync backend
  }

  useEffect(() => {
    loadMessages();
  }, [chatId]);

  if (loading) return <p>Loading chat…</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ flex: 1, overflowY: "auto" }}>
        <MessageList messages={messages} />
      </div>

      <MessageInput onSend={sendMessage} />
    </div>
  );
}
