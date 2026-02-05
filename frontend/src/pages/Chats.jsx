import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Chats() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
