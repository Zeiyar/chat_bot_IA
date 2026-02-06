export default function EmptyChat() {

  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "#666",
    }}>
      <h2>Aucun chat sélectionné</h2>
      <p>Choisis un chat dans la sidebar ou crée-en un nouveau.</p>
    </div>
  );
}
