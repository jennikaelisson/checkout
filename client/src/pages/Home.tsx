import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./../App.css";
import PaymentButton from "../components/Payment";
import ProductList from "../components/ProductList";

const Home = () => {
  const [user, setUser] = useState<string>("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [emailLoginInput, setEmailLoginInput] = useState("");
  const [passwordLoginInput, setPasswordLoginInput] = useState("");

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3001/api/auth/authorize", {
        credentials: "include",
      });

      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
      } else {
        setUser("");
      }
    };
    authorize();
  }, []);

  const register = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    });
    const data = await response.json();
    console.log(data);

    setRegistrationSuccess(true);
  };

  const login = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: emailLoginInput,
        password: passwordLoginInput,
      }),
    });
    const data = await response.json();

    if (response.status === 200) {
      setUser(data);
    } else {
      setUser("");
    }
    setEmailLoginInput("");
    setPasswordLoginInput("");
  };

  const logout = async () => {
    const response = await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.status === 200) {
      setUser("");
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
  };

  const handleLoginEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailLoginInput(e.target.value);
  };

  const handleLoginPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordLoginInput(e.target.value);
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
    setRegistrationSuccess(false);
  };

  return (
    <>
      <div>
        {user ? (
          <>
          <div><ProductList /></div>
            <div>
              <PaymentButton />
            </div>
            <button onClick={logout}>Logga ut</button>
          </>
        ) : (
          <>
            <button onClick={handleRegisterClick}>Registrera</button>
            <button onClick={handleLoginClick}>Logga in</button>

            {showRegisterForm && (
              <>
                {registrationSuccess && <p>Registrering lyckad</p>}
                <form onSubmit={register}>
                  <label htmlFor="emailInput">Email</label>
                  <input
                    id="emailInput"
                    value={emailInput}
                    onChange={handleEmailChange}
                  />
                  <label htmlFor="passwordInput">Password</label>
                  <input
                    id="passwordInput"
                    value={passwordInput}
                    onChange={handlePasswordChange}
                  />
                  <button>Registrera</button>
                </form>
              </>
            )}

            {showLoginForm && (
              <form onSubmit={login}>
                <label htmlFor="emailLoginInput">Email</label>
                <input
                  id="emailLoginInput"
                  value={emailLoginInput}
                  onChange={handleLoginEmailChange}
                />
                <label htmlFor="passwordLoginInput">Password</label>
                <input
                  id="passwordLoginInput"
                  value={passwordLoginInput}
                  onChange={handleLoginPasswordChange}
                />
                <button>Logga in</button>
              </form>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
