import { PropsWithChildren, createContext, useContext, useState } from "react";

interface IUser {
  username: string;
  isLoggedIn: boolean;
}

interface IUserValues {
    user: IUser | null;
    loginUser: (username: string) => void;
    logoutUser: () => void;
}

const initialValues = {
    user: null,
    loginUser: () => {},
    logoutUser: () => {}  
}

const UserContext = createContext<IUserValues>(initialValues);
export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);

  // Exempel på inloggning funktion
  const loginUser = (username: string) => {
    setUser({ username, isLoggedIn: true });
  };

  // Exempel på utloggning funktion
  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
