import { useState } from "react";
import "./../App.css";

const Home = () => {
  const [user, setUser] = useState<string>("");

  const register = async () => {
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: "enemail@gmeailw.com", password: "123442" }),
    });
    const data = await response.json();
    console.log(data);
  };

  const login = async () => {
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: "enemail@gmeailw.com", password: "123442" }),
    });
    const data = await response.json();
    
    if (response.status === 200) {
        setUser(data)
    } else {
        setUser("")
    }
  };

  return (
    <>
      <h1>{user ? "Inloggad:" + user : "Utloggad"}</h1>
      <button onClick={register}>Registrera</button>
      <button onClick={login}>Logga in</button>
    </>
  );
};

export default Home;
