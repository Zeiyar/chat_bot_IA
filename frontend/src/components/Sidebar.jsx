import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth_api";
import { useAuth } from "../auth/AuthContext";

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
        </div>
      ))}
    </div>
  );
}
