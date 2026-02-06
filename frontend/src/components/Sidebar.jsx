import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { deleteChat, createChatApi } from "../api/chat_api";

export default function Sidebar() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  useEffect(() => {
    fetch("http://localhost:8000/chats", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(setChats);
  }, []);

  async function createChat() {
    const chat = await createChatApi();

    setChats(prev => [chat, ...prev]);
    navigate(`/chats/${chat.id}`);
  }

  async function handleLogout() {
    await logoutUser();
    navigate("/login");
  }
  
  async function handleDelete(chatId, e) {
    e.stopPropagation();

    const confirmDelete = window.confirm("Supprimer ce chat ?");
    if (!confirmDelete) return;

    await deleteChat(chatId);

    setChats(prev => {
        // 🛡️ sécurité absolue
        const safePrev = Array.isArray(prev) ? prev : [];

        const updated = safePrev.filter(c => c.id !== chatId);

        return updated;
    });

    // navigation APRÈS le setState
    setTimeout(() => {
        setChats(current => {
        if (!Array.isArray(current) || current.length === 0) {
            navigate("/chats");
        } else {
            navigate(`/chats/${current[0].id}`);
        }
        return current;
        });
    }, 0);
    }


  return (
  <aside className="sidebar">
    <div className="sidebar__top">
      <button className="btn btn--ghost" onClick={handleLogout}>Logout</button>
      <button className="btn btn--primary" onClick={createChat}>+ New chat</button>
    </div>

    <div className="sidebar__list">
      {Array.isArray(chats) && chats.map((chat) => (
        <div
          key={chat.id}
          className="chat-item"
          onClick={() => navigate(`/chats/${chat.id}`)}
        >
          <span className="chat-item__title">{chat.title}</span>
          <button
            className="icon-btn icon-btn--danger"
            onClick={(e) => handleDelete(chat.id, e)}
            title="Supprimer"
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  </aside>
)
}
