import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Chat from "../pages/Chat";
import ProtectedRoute from "../auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

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
                  <DashboardLayout />
                </ProtectedRoute>
            }
            />
        <Route path="/chats/:chatId" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}