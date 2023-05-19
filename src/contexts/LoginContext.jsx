import { createContext, useContext, useEffect, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token-game-store');
    if (token) {
      setIsLogin(true);
    }

    const storedToken = localStorage.getItem('token-game-store');

    if (storedToken) {
      const data = JSON.parse(storedToken);
      setRole(data.role);
    }

    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem('token-game-store');
  };

  return (
    <LoginContext.Provider
      value={{ isLogin, handleLogin, handleLogout, isLoading, role }}
    >
      {children}
    </LoginContext.Provider>
  );
};
