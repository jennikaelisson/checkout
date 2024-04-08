import { useEffect, useState } from "react";
import "./../App.css";
import PaymentButton from "../components/Payment";

const Home = () => {
  const [user, setUser] = useState<string>("");

    useEffect(() => {
        const authorize = async () => {
            const response = await fetch("http://localhost:3001/api/auth/authorize", {
                credentials: "include"
              });

              const data = await response.json();
              if (response.status === 200) {
                setUser(data)
              } else {
                setUser("")
              }
        }
        authorize()
    }, [])

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

  const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      
      if (response.status === 200) {
          setUser("")
      } 
  }

  return (
    <>
      <h1>{user ? "Inloggad:" + user : "Utloggad"}</h1>
      <button onClick={register}>Registrera</button>
      <button onClick={login}>Logga in</button>
      <button onClick={logout}>Logga ut</button>

      <div><PaymentButton /></div>
    </>
  );
};

export default Home;
