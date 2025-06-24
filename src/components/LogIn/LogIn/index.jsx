import '../LogIn/index.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LogIn = ({ onLogin, onRegisterClick}) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!username) {
      newErrors.username = t('login.usernameRequired');
    }
    if (!password) {
      newErrors.password = t('login.passwordRequired');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onLogin(username, password);
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
          {errors.username && <div className="error">{errors.username}</div>}
        </div>

        <div className="login-group">
          <label htmlFor="password">{t('login.password')}</label>
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
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <button type="submit" className="login-button">
          {t('login.submit')}
        </button>
        
        <button onClick={onRegisterClick}>
          {t('login.goToRegister')}
        </button>
      </form>
    </div>
  );
};

export default LogIn;
