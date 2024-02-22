import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userLogged, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false)
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ userLogged, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
