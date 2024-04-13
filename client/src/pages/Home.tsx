import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./../App.css";
import PaymentButton from "../components/Payment";
import ProductList from "../components/ProductList";
import CartProvider from "../context/CartContext";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { user, loginUser, logoutUser } = useUser();
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");

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
        loginUser(data);
      } else {
        logoutUser();
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
      body: JSON.stringify({ name: nameInput, email: emailInput, password: passwordInput }),
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
      loginUser(data);
    } else {
      logoutUser();
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
      logoutUser();
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value);
  }

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
    <CartProvider>
      <div>
        <div>
              <Header />
            
        <PaymentButton />
      </div>
            
        {user ? (
          <>
            
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
                  <label htmlFor="">Name</label>
                  <input
                    id="nameInput"
                    value={nameInput}
                    onChange={handleNameChange}
                  />
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
                  type="password"
                  value={passwordLoginInput}
                  onChange={handleLoginPasswordChange}
                />
                <button>Logga in</button>
              </form>
            )}
          </>
        )}<div>
        <ProductList />
      </div>
      
      </div>
    </CartProvider>
  );
};

export default Home;
