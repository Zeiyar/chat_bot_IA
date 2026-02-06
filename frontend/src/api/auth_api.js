import { api } from "./http";

export async function login(email, password) {
  await api.post("/auth/login", { email, password });
}

export async function register(email, password) {
  await api.post("/auth/register", { email, password });
}

export async function fetchMe() {
  const res = await api.get("/users/me");
  return res.data;
}

export async function logout() {
  await api.post("/auth/logout");
}
