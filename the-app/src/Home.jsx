import { Link } from 'react-router-dom';
import './Home.css'; // Optional styling

function Home() {
  return (
    <div className="home-wrapper">
      <h1>THE APP</h1>
      <Link className="home-btn" to="/waifu">Waifu Generator</Link>
      <Link className="home-btn" to="/dragonball">Dragon Ball Generator</Link>
      {/* Add more links here */}
    </div>
  );
}

export default Home;
