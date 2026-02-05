import { useAuth } from "../auth/AuthContext";

export default function Chats() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Chats</h2>
      <p>Connected as: {user?.email}</p>
    </div>
  );
}