import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "../api/chat_api";
import Loader from "../components/Loader"

import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";

export default function Chat() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  useEffect(() => {
    async function loadMessages() {
      try {
        setLoading(true);
        const data = await fetchMessages(chatId);
        setMessages(data);
      } catch (e) {
        setMessages([]);
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
    setIsThinking(true);

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
    } finally {
    setIsThinking(false);
  }
  }

  if (loading) return <p>Chargement du chat…</p>;

  return (
  <div className="chat">
    <MessageList messages={messages} />
    {isThinking && <Loader />}
    <MessageInput onSend={sendingMessage} disable={isThinking} />
  </div>
);

}
