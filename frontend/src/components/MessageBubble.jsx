export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "10px 14px",
          borderRadius: 12,
          background: isUser ? "#DCF8C6" : "#F1F1F1",
        }}
      >
        {message.content}
      </div>
    </div>
  );
}
