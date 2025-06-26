import './index.css';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from 'axios';

const AntColonyTrackingOverlay = ({ index }) => {
  const isOpen = index !== null;
  if (!isOpen) return null;
  const { t, i18n } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [colony, setColony] = useState([]);

  // State des champs (pour gérer l'édition)
  const [formData, setFormData] = useState({
    colonyName: '',
    speciesName: '',
    individualCount: '',
    lastFeeding: '',
    lastHumidity: '',
  });

  useEffect(() => {
    const fetchColony = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:3000/api/colonies/${index}`, {
          method: "GET",  
          headers: {
              Authorization: `Bearer ${token}`
          },
        });

        const data = await res.json();
        console.log(data);
        setFormData({
          colonyName: data.colonyName,
          speciesName: data.speciesName,
          individualCount: data.individualCount,
          lastFeeding: data.lastFeeding?.slice(0, 10),
          lastHumidity: data.lastHumidity?.slice(0, 10),
        });
      } catch (err) {
        console.error("Error to find colony :", err);
        if (err instanceof Response) {
          const text = await err.text();
          console.error("Error :", text);
        }
      }
    };

    fetchColony();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:3000/api/colonies/${index}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving colony:", error);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    const confirmed = window.confirm(t("Are you sure you want to delete this colony?"));

    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/colonies/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(t("Colony deleted successfully"));

      // Option : actualiser ou fermer
      window.location.reload(); // ou remonter un événement pour fermer l'overlay proprement
    } catch (error) {
      console.error("Error deleting colony:", error);
      alert(t("Error deleting colony"));
    }
  };


  return (
    <div className="ant-colony-overlay">
      <h3>{t("ant-colony-tracking.Ant Colony Tracking")}</h3>

      <div className="ant-colony-group">
        <label htmlFor="colonyName">{t("ant-colony-tracking.Colony Name")} :</label>
        {isEditing ? (
        <input
          type="text"
          id="colonyName"
          name="colonyName"
          placeholder={t("ant-colony-tracking.Enter colony name")}
          value={formData.colonyName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        ) : (
          <div><label> {formData.colonyName}</label></div>
        )}
      </div>

      <div className="ant-colony-group">
        <label htmlFor="speciesName">{t("ant-colony-tracking.Species Name")} :</label>
        {isEditing ? (
        <input
          type="text"
          id="speciesName"
          name="speciesName"
          placeholder={t("ant-colony-tracking.Enter species name")}
          value={formData.speciesName}
          onChange={handleChange}
          disabled={!isEditing}
        />
        ) : (
          <div><label> {formData.speciesName}</label></div>
        )}
      </div>

      <div className="ant-colony-group">
        <label htmlFor="individualCount">{t("ant-colony-tracking.Individual Count")} :</label>
        {isEditing ? (
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
        ) : (
          <div><label> {formData.individualCount}</label></div>
        )}
      </div>

      <div className="ant-colony-group">
        <label htmlFor="lastFeeding">{t("ant-colony-tracking.Last Feeding")} :</label>
        {isEditing ? (
        <input
          type="date"
          id="lastFeeding"
          name="lastFeeding"
          value={formData.lastFeeding}
          onChange={handleChange}
          disabled={!isEditing}
        />
        ) : (
          <div><label> {new Date(formData.lastFeeding).toLocaleDateString(i18n.language)}</label></div>
        )}
      </div>

      <div className="ant-colony-group">
        <label htmlFor="lastHumidity">{t("ant-colony-tracking.Last Humidity")} :</label>
        {isEditing ? (
        <input
          type="date"
          id="lastHumidity"
          name="lastHumidity"
          value={formData.lastHumidity}
          onChange={handleChange}
          disabled={!isEditing}
        />
        ) : (
          <div><label> {new Date(formData.lastHumidity).toLocaleDateString(i18n.language)}</label></div>
        )}
      </div>

      {!isEditing ? (
      <button className="ant-colony-edit-button" onClick={toggleEdit}>
        {t("Edit")}
      </button>
    ) : (
      <>
        <button className="ant-colony-save-button" onClick={handleSave}>
          {t("Save Tracking")}
        </button>
        <button className="ant-colony-delete-button" onClick={handleDelete}>
          {t("Delete Colony")}
        </button>
      </>
    )}

    </div>
  );
};

export default AntColonyTrackingOverlay;
