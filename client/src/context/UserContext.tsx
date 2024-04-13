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

  const loginUser = (username: string) => {
    setUser({ username, isLoggedIn: true });
  };

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
