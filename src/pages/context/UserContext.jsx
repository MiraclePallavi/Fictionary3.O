
import {
  createContext,
  useState,
  useContext as _useContext,
  useEffect,
} from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const login = (new_token) => {
    localStorage.setItem("fictionary_token", new_token);
    setToken(new_token);
  };
  const logout = () => {
    localStorage.removeItem("fictionary_token", "");
    setToken("");
  };

  useEffect(() => {
    var _token = localStorage.getItem("fictionary_token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useContext = () => _useContext(UserContext);

export default useContext;
export { UserContext,UserProvider  , useContext };
