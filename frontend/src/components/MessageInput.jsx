import { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;

    onSend(text);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        padding: 12,
        borderTop: "1px solid #ddd",
      }}
    >
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write a message…"
        style={{
          flex: 1,
          padding: 10,
          borderRadius: 20,
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: 8,
          padding: "0 16px",
        }}
      >
        Envoyé
      </button>
    </form>
  );
}
