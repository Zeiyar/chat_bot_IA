import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe, logout } from "../api/auth_api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    try {
      const data = await fetchMe();
      setUser(data);
      }
    catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logoutUser() {
    await logout();
    setUser(null);
  }


  // 👉 Appelé au chargement
  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: fetchMe, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// stocke l'utilisateur connecté, vérifie automatiquement le JWT
// AuthContext est partagé partout dans l'app