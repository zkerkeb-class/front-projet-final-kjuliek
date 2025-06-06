import './index.css';
import { useTranslation } from "react-i18next";

const SettingsOverlay = ({ isOpen }) => {
  const { t ,i18n } = useTranslation();
  if (!isOpen) return null;

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="settings-overlay">
      <h3>{t("settings.Settings")}</h3>
      <div className="setting-group">
        <label>{t("settings.Theme")} :</label>
        <select>
          <option>{t("settings.Light")}</option>
          <option>{t("settings.Dark")}</option>
        </select>
      </div>
      <div className="setting-group">
        <label>{t("settings.Language")} :</label>
        <select id="language-select" value={i18n.language} onChange={handleChange}>
          <option value="fr">{t("settings.French")}</option>
          <option value="en">{t("settings.English")}</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsOverlay;