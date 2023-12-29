import { createContext, useContext, useState, ReactNode, FC } from 'react';
import { useNavigate} from 'react-router-dom'
interface AuthContextType {
  auth: {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
  };
  login: (email: string, password: string, setOpen: any, setError: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
    isAuthenticated: !!localStorage.getItem('token'),
    user: null,
    token: localStorage.getItem('token'),
  });

  const login = async (email: string, password: string, setOpen: any, setError: any) => { //aaryan type
    console.log("emaiil", email,password);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setAuth({ isAuthenticated: true, user: data.user, token: data.token });
        localStorage.setItem('token', data.token);
        navigate('/todos');
      } else {
        setError(data.message);
        setOpen(true);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError("Sorry, some error occured :( Please try again");
      setOpen(true);
      throw error;
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
