import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { login } from "../api/auth_api";

export default function Login() {
  const [email, setEmail] = useState("looser@example.com");
  const [password, setPassword] = useState("string");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { refreshUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password); // cookie posé
      await refreshUser();          // /me
      navigate("/chats");
    } catch {
      setError("Invalid credentials");
    }
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Pas de compte ? <Link to="/register">Créer un compte</Link>
      </p>
    </div>
  );
}
