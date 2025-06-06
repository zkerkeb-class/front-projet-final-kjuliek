import './index.css';
import { useTranslation } from "react-i18next";

const ProfilOverlay = ({ isOpen }) => {
  if (!isOpen) return null;
  const { t } = useTranslation();

  return (
    <div className="profil-overlay">
      <h3>{t("profile-settings.Profile Settings")}</h3>

      <div className="profil-group">
        <label htmlFor="pseudo">{t("profile-settings.Username")} :</label>
        <input type="text" id="pseudo" name="pseudo" placeholder="Votre pseudo" />
      </div>

      <div className="profil-group">
        <label htmlFor="email">{t("profile-settings.Email")} :</label>
        <input type="email" id="email" name="email" placeholder="votre@mail.com" />
      </div>

      <div className="profil-group">
        <label htmlFor="password">{t("profile-settings.Password")} :</label>
        <input type="password" id="password" name="password" placeholder="••••••••" />
      </div>

      <button className="logout-button" type="button">
        {t("profile-settings.Log out")}
      </button>
    </div>
  );
};

export default ProfilOverlay;