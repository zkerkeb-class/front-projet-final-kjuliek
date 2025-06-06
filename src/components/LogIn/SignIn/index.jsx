import './index.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SignIn = ({ onLogin }) => {
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
      newErrors.email = t('signin.invalidEmail');
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = t('signin.passwordMismatch');
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
      <h1 className="title">{t('signin.title')}</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-group">
          <label htmlFor="username">{t('signin.username')}</label>
          <input
            className="login-input"
            type="text"
            id="username"
            name="username"
            placeholder={t('signin.usernamePlaceholder')}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <label htmlFor="email">{t('signin.email')}</label>
        <div className="login-group">
          <input
            className="login-input"
            type="email"
            id="email"
            name="email"
            placeholder={t('signin.emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </div>

        <label htmlFor="password">{t('signin.password')}</label>
        <div className="login-group">
          <input
            className="login-input"
            type="password"
            id="password"
            name="password"
            placeholder={t('signin.passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <label htmlFor="confirmPassword">{t('signin.confirmPassword')}</label>
        <div className="login-group">
          <input
            className="login-input"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder={t('signin.confirmPasswordPlaceholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
        </div>

        <button type="submit" className="login-button">
          {t('signin.submit')}
        </button>
      </form>
    </div>
  );
};

export default SignIn;

