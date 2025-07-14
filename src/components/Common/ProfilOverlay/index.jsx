import './index.css';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FaEdit, FaSave } from 'react-icons/fa';

const ProfilOverlay = ({ isOpen }) => {
  if (!isOpen) return null;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    mail: "",
    password: ""
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:3000/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setFormData({
          username: data.user.username || "",
          mail: data.user.mail || "",
          password: ""
        });
      } catch (err) {
        console.erreur("Error to find user :", err);
        if (err instanceof Response) {
          const text = await err.text();
          console.erreur("Error :", text);
        }
      }

    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3000/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsEditing(false);
      } else {
        alert("Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error("Erreur maj profil", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profil-overlay">
      <h3>{t("profile-settings.Profile Settings")}</h3>

      {isEditing ? (
        <button className="save-button" onClick={handleSave}>
          <FaSave />
        </button>
      ) : (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          <FaEdit />
        </button>
      )}

      <div className="profil-group">
        <label htmlFor="pseudo">{t("profile-settings.Username")} :</label>
        {isEditing ? (
          <input
            type="text"
            id="pseudo"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        ) : (
          <div><label> {formData.username}</label></div>
        )}
      </div>

      <div className="profil-group">
        <label htmlFor="mail">{t("profile-settings.Mail")} :</label>
        {isEditing ? (
          <input
            type="email"
            id="mail"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        ) : (
          <div><label> {formData.mail}</label></div>
        )}
      </div>

      <div className="profil-group">
        <label htmlFor="password">{t("profile-settings.Password")} :</label>
        {isEditing ? (
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            readOnly={!isEditing}
            required={isEditing}
          />
        ) : (
          <div><label> ••••••••</label></div>
        )}
      </div>

      <button className="logout-button" onClick={handleLogout}>
        {t("profile-settings.Log out")}
      </button>
    </div>
  );
};

export default ProfilOverlay;
