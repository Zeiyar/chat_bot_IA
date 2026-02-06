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
            className={`message ${isUser ? "user" : "assistant"}`}
            style={{
                alignSelf: isUser ? "flex-end" : "flex-start",
                background: isUser ? "#DCF8C6" : "#F1F0F0",
                padding: "8px 12px",
                borderRadius: "8px",
                marginBottom: "6px",
                maxWidth: "70%",
            }}
            >
            {message.content}
        </div>
    </div>
  );
}
