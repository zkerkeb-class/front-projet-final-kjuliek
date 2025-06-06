import './index.css';
import { useTranslation } from "react-i18next";

import logoImg from '../../../assets/images/img-logo-black.png';

const NavBar = () => {
    const { t } = useTranslation();
  return (
    <nav className="navbar">
      <div className="background" />
      <div className="logo">
        <img src={logoImg} alt="Logo" className="logo-image" />
        FourmApp
      </div>
      <ul className="navLinks">
        <li>{t("navbar.Home")}</li>
        <li>{t("navbar.Identification")}</li>
        <li>{t("navbar.Distribution")}</li>
        <li>{t("navbar.Species")}</li>
        <li>{t("navbar.Anatomy")}</li>
      </ul>
    </nav>
  );
};

export default NavBar;
