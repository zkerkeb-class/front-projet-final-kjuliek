import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import LogIn from "../../components/LogIn/LogIn";
import SignIn from "../../components/LogIn/SignIn"; // <-- tu crées ou importes ton composant

const LoginPage = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const handleRegister = (username, mail, password) => {
  if (!username || !mail || !password) {
    alert("Please fill in username, mail and password");
    return;
  }

    axios
      .post("http://localhost:3000/api/register", { username, mail, password })
      .then((res) => {
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          alert("Registration successful, but no token received.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Error during registration");
      });
  };

  const handleLogin = (username, password) => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    axios
      .post("http://localhost:3000/api/login", { username, password })
      .then((res) => {
        const token = res?.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          alert("Error: no token received.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Invalid username or password");
      });
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
  };

  const handleBackToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <div className="page no-scroll">
      <div className="overlay" />
      {isRegistering ? (
        <SignIn onRegister={handleRegister} onLoginClick={handleBackToLogin} />
      ) : (
        <LogIn onLogin={handleLogin} onRegisterClick={handleRegisterClick} />
      )}
    </div>
  );
};

export default LoginPage;
