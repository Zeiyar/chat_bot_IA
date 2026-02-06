import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth_api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    await register(email, password);
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Créer son compte</h2>

        <input
          className="auth-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
        />

        <button className="auth-button">Create</button>

        <p className="auth-link">
          Déjà un compte ? <Link to="/login">se connecter</Link>
        </p>
      </form>
    </div>
  );
}
