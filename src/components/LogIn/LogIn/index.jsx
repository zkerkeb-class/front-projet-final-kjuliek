import '../LogIn/index.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LogIn = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validateEmail(email)) {
      newErrors.email = t('login.invalidEmail');
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('login.passwordMismatch');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onLogin(username, email, password);
  };

  return (
    <div className="login">
      <h1 className="title">{t('login.title')}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-group">
          <label htmlFor="username">{t('login.username')}</label>
          <input
            className="login-input"
            type="text"
            id="username"
            name="username"
            placeholder={t('login.usernamePlaceholder')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <label htmlFor="password">{t('login.password')}</label>
        <div className="login-group">
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            placeholder={t('login.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          {t('login.submit')}
        </button>
      </form>
    </div>
  );
};

export default LogIn;