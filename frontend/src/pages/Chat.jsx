import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../api/chat_api";

import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

export default function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMessages() {
      try {
        setLoading(true);
        const data = await fetchMessages(chatId);
        setMessages(data);
      } catch (e) {
        setError("Impossible de charger le chat");
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, [chatId]);

  async function sendingMessage(content) {
    if (!content.trim()) return;

    // 1️⃣ Optimistic UI – message user
    const tempUserMessage = {
      id: "temp-user-" + Date.now(),
      role: "user",
      content,
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempUserMessage]);

    try {
      // 2️⃣ Appel backend (IA + sauvegarde)
      const res = await sendMessage(chatId, content);

      // 3️⃣ Ajout réponse IA
      const aiMessage = {
        id: "temp-ai-" + Date.now(),
        role: "assistant",
        content: res.response,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Loading chat…</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <MessageList messages={messages}/>
      <MessageInput onSend={sendingMessage}/>
    </>
  );
}
