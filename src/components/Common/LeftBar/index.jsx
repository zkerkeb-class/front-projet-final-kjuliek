import './index.css';
import { useState } from 'react';
import { FaUserCircle, FaCog, FaPlusCircle, FaBug } from 'react-icons/fa';
import SettingsOverlay from '../SettingsOverlay';
import ProfilOverlay from '../ProfilOverlay';
import AntColonyTrackingOverlay from '../AntColonyTrackingOverlay';

const LeftBar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfil, setShowProfil] = useState(false);
  const [openAntColonyIndex, setOpenAntColonyIndex] = useState(null);
  const [circleCount, setCircleCount] = useState(0);


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

  const addCircle = () => {
    setCircleCount(prev => prev + 1);
    setShowSettings(false);
    setShowProfil(false);
    setOpenAntColonyIndex(null);
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
        {Array.from({ length: circleCount }).map((_, index) => (
            <button 
              className={`icon-button ${openAntColonyIndex === index ? 'open' : ''}`}
              onClick={() => toggleAntColony(index)}>
                <FaBug className="icon" />
            </button>
        ))}
        <button className="icon-button" onClick={addCircle}>
          <FaPlusCircle className="icon" />
        </button>
      </div>

      <SettingsOverlay isOpen={showSettings} />
      <ProfilOverlay isOpen={showProfil} />
      <AntColonyTrackingOverlay isOpen={openAntColonyIndex !== null} />
    </div>
  );
};

export default LeftBar;