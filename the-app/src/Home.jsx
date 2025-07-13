import { Link } from 'react-router-dom';
import './Home.css'; // Optional styling

function Home() {
  return (
    <>
      <header>
        <div className="title">
          <h1>THE APP</h1>
        </div>
      </header>
      <div className="home-wrapper">
        <Link className="home-btn" to="/waifu">Waifu Generator</Link>
        <Link className="home-btn" to="/dragonball">Dragon Ball Generator</Link>
        <Link className="home-btn" to="/keanu">Keanu's Woah!</Link>
        {/* Add more links here */}
      </div>
    </>
  );
}

export default Home;
