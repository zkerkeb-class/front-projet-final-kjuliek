import './index.css';
import image from '../../../assets/images/fourmis.png';

const AntImage = () => {
  return (
    <header className="img">
      <img src={image} alt="Fourmi" />
    </header>
  );
};

export default AntImage;
