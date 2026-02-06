export default function Loader({ label = "L’IA réfléchit…" }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "12px 16px",
      color: "#666",
      fontStyle: "italic",
    }}>
      <span className="dot">●</span>
      <span className="dot">●</span>
      <span className="dot">●</span>
      <span>{label}</span>
    </div>
  );
}