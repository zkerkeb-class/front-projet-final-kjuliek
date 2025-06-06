import './index.css';
import video from '../../../assets/video/accueil.mp4';

const Banner = () => {
  return (
    <header className="banner">
      <video
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
    </header>
  );
};

export default Banner;
