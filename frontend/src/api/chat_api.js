import { api } from "./http";

export async function fetchMessages(chatId) {
  const res = await api.get(`/chats/${chatId}/messages`);
  return res.data;
}

export async function createChat() {
  const res = await api.post("/chats");
  return res.data;
}

export async function sendMessage(chatId, prompt) {
  const res = await api.post(`/ask-ai/${chatId}`, {
    prompt,
  });
  return res.data;
}