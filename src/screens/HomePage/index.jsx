import { Link, useNavigate } from "react-router";
import '../../index.css';
import NavBar from "../../components/Common/NavBar";
import LeftBar from "../../components/Common/LeftBar";
import Banner from "../../components/Home/Banner";
import AntImage from "../../components/Home/AntImage";
import Article from "../../components/Home/Article";

const HomePage = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate("/login");
    }

    return (
    <div className="page no-scroll">
      <div className="overlay" />
      <NavBar />
      <LeftBar />
      <div 
        className="column"
        style={{ position: 'relative', top: '60px', left: '60px' }}>
        <Banner />
        <div className="row">
          <AntImage />
          <Article />
        </div>
      </div>
    </div>
  );
}

export default HomePage;