import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./auth/AuthContext";

import "./styles/theme.css";
import "./styles/auth.css";
import "./styles/layout.css";
import "./styles/chat.css";
import "./styles/sidebar.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

