import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button>Create</button>
    </form>
  );
}
