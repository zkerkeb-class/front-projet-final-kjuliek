import './index.css';
import { useTranslation } from "react-i18next";
import { useState } from "react";

const AntColonyTrackingOverlay = ({ isOpen }) => {
  if (!isOpen) return null;
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // State des champs (pour gérer l'édition)
  const [formData, setFormData] = useState({
    colonyName: '',
    speciesName: '',
    individualCount: '',
    lastFeeding: '',
    lastHumidity: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // ici tu peux gérer la sauvegarde, ex: envoyer au backend
    setIsEditing(false);
  };

  return (
    <div className="ant-colony-overlay">
      <h3>{t("ant-colony-tracking.Ant Colony Tracking")}</h3>

      <div className="ant-colony-group">
        <label htmlFor="colonyName">{t("ant-colony-tracking.Colony Name")} :</label>
        <input
          type="text"
          id="colonyName"
          name="colonyName"
          placeholder={t("ant-colony-tracking.Enter colony name")}
          value={formData.colonyName}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className="ant-colony-group">
        <label htmlFor="speciesName">{t("ant-colony-tracking.Species Name")} :</label>
        <input
          type="text"
          id="speciesName"
          name="speciesName"
          placeholder={t("ant-colony-tracking.Enter species name")}
          value={formData.speciesName}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className="ant-colony-group">
        <label htmlFor="individualCount">{t("ant-colony-tracking.Individual Count")} :</label>
        <input
          type="number"
          id="individualCount"
          name="individualCount"
          placeholder={t("ant-colony-tracking.Enter number of individuals")}
          value={formData.individualCount}
          onChange={handleChange}
          disabled={!isEditing}
          min="0"
        />
      </div>

      <div className="ant-colony-group">
        <label htmlFor="lastFeeding">{t("ant-colony-tracking.Last Feeding")} :</label>
        <input
          type="date"
          id="lastFeeding"
          name="lastFeeding"
          value={formData.lastFeeding}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      <div className="ant-colony-group">
        <label htmlFor="lastHumidity">{t("ant-colony-tracking.Last Humidity")} :</label>
        <input
          type="date"
          id="lastHumidity"
          name="lastHumidity"
          value={formData.lastHumidity}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </div>

      {!isEditing ? (
        <button className="ant-colony-edit-button" onClick={toggleEdit}>
          {t("Edit")}
        </button>
      ) : (
        <button className="ant-colony-save-button" onClick={handleSave}>
          {t("Save Tracking")}
        </button>
      )}
    </div>
  );
};

export default AntColonyTrackingOverlay;
