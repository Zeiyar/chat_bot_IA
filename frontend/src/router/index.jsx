import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import ProtectedRoute from "../auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import EmptyChat from "../pages/EmptyChat"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
            >
        <Route index element={<EmptyChat />} />          {/* dernier chat */}
        <Route path=":chatId" element={<Chat />} /> {/* chat spécifique */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}