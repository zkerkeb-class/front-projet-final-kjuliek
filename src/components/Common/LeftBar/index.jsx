import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaCog, FaPlusCircle, FaBug } from 'react-icons/fa';

import './index.css';
import SettingsOverlay from '../SettingsOverlay';
import ProfilOverlay from '../ProfilOverlay';
import AntColonyTrackingOverlay from '../AntColonyTrackingOverlay';

const LeftBar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfil, setShowProfil] = useState(false);
  const [openAntColonyIndex, setOpenAntColonyIndex] = useState(null);
  const [colonies, setColonies] = useState([]);
  
  useEffect(() => {
    const fetchColonies = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:3000/api/colonies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setColonies(res.data || []);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching colonies:", err);
      }
    };

    fetchColonies();
  }, []);

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
    setShowProfil(false);
    setOpenAntColonyIndex(null);
  };

  const toggleProfil = () => {
    setShowProfil(prev => !prev);
    setShowSettings(false);
    setOpenAntColonyIndex(null);
  };

  const toggleAntColony = (index) => {
    if (openAntColonyIndex === index) {
      setOpenAntColonyIndex(null);
    } else {
      setOpenAntColonyIndex(index);
    }
    setShowSettings(false);
    setShowProfil(false);
  };

  // const addCircle = () => {
  //   setCircleCount(prev => prev + 1);
  //   setShowSettings(false);
  //   setShowProfil(false);
  //   setOpenAntColonyIndex(null);
  // };

  const addCircle = async () => {
    setShowSettings(false);
    setShowProfil(false);
    setOpenAntColonyIndex(null);

    const emptyColony = {
      colonyName: "colonyName",
      speciesName: "speciesName",
      individualCount: 0,
      lastFeeding: "2025-06-20T15:30:00.000Z",
      lastHumidity: "2025-06-20T15:30:00.000Z",
    };

    
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/colonies",
        emptyColony,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newColony = res.data.colony;
      setColonies(prev => [...prev, newColony]);

    } catch (err) {
      console.error("Error creating new colony:", err);
      alert("Erreur lors de la création de la colonie.");
    }

  };

  return (
    <div className="leftbar">
      <div className="icon-container">
        <button    
            className={`icon-button ${showSettings ? 'open' : ''}`}
            onClick={toggleSettings}>
          <FaCog className="icon" />
        </button>
        <button 
            className={`icon-button ${showProfil ? 'open' : ''}`}
            onClick={toggleProfil}>
          <FaUserCircle className="icon" />
        </button>
        {colonies.map((colony, index) => (
          <button
            key={index}
            className={`icon-button ${openAntColonyIndex === index ? 'open' : ''}`}
            onClick={() => toggleAntColony(index)}
          >
            <FaBug className="icon" />
          </button>
        ))}
        <button className="icon-button" onClick={addCircle}>
          <FaPlusCircle className="icon" />
        </button>
      </div>

      <SettingsOverlay isOpen={showSettings} />
      <ProfilOverlay isOpen={showProfil} />
      {openAntColonyIndex !== null && (
        <AntColonyTrackingOverlay
          key={openAntColonyIndex}
          index={openAntColonyIndex}
        />
      )}
    </div>
  );
};

export default LeftBar;