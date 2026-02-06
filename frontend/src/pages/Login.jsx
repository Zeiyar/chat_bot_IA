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

  /*
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
}*/

return (
  <div className="auth-page">
  <form onSubmit={handleSubmit} className="auth-form">
    <h2>Connexion</h2>

    <input
      className="auth-input"
      type="email"
      placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />

    <input
      className="auth-input"
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />

    <button type="submit" className="auth-button">
      LOGIN
    </button>

    {error && (
      <p className="auth-error">
        {error}
      </p>
    )}

    <p className="auth-link">
      Pas de compte ? <Link to="/register">Créer un compte</Link>
    </p>
  </form>
</div>
);
}
