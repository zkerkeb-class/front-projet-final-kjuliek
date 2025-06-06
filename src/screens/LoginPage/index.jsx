import { useNavigate } from "react-router";
import { useEffect } from "react";
import LogIn from "../../components/LogIn/LogIn";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (username, password) => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    axios.post("http://localhost:3000/api/login", { username, password })
      .then(async (res) => {
        await localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch(() => {
        alert("Invalid username or password");
      });
  };

  return (
    <div className="page no-scroll">
      <div className="overlay" />
      <LogIn onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
