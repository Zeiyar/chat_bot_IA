import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth_api";
import { useAuth } from "../auth/AuthContext";
import { deleteChat } from "../api/chat_api";

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
    const res = await fetch("http://localhost:8000/chats", {
      method: "POST",
      credentials: "include",
    });
    const chat = await res.json();
    navigate(`/chats/${chat.id}`);
  }
  async function handleLogout() {
    await logout();
    await logoutUser();
    navigate("/login");
  }
  async function handleDelete(chatId, e) {
    e.stopPropagation(); // empêche navigation au clic

    const confirm = window.confirm("Supprimer ce chat ?");
    if (!confirm) return;

    await deleteChat(chatId)

    // rafraîchir la liste
    setChats(prev => {
        const updated = prev.filter(c => c.id !== chatId);

        if (updated.length > 0){
            navigate(`/chats/${updated[0].id}`)
        }else {
            navigate("/chats");
        }
    })

    // redirection si on était dans ce chat
    return updated
    }


  return (
    <div style={{ width: 250, borderRight: "1px solid #ddd" }}>
      <button onClick={handleLogout} style={{ margin: 12 }}>
        Logout
      </button>
      <button onClick={createChat}>+ New chat</button>
      {chats.map(chat => (
        <div
          key={chat.id}
          onClick={() => navigate(`/chats/${chat.id}`)}
        >
           {chat.title}
        <button
            onClick={(e) => handleDelete(chat.id,e)}
            style={{ color: "red" }}
            >
            🗑
        </button>
        </div>
      ))}
    </div>
  );
}
