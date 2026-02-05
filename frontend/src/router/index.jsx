import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chats from "../pages/Chats";
import Chat from "../pages/Chat";
import ProtectedRoute from "../auth/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/chats"
            element={
                <ProtectedRoute>
                <Chats />
                </ProtectedRoute>
            }
            />
        <Route path="/chats/:chatId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}