import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Waifu from './waifu';
import DragonBall from './Dragonball.jsx';
import Keanu from './Keanu';
import BirdSounds from './BirdSounds';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/waifu" element={<Waifu />} />
      <Route path="/dragonball" element={<DragonBall />} />
      <Route path="/keanu" element={<Keanu />} />
      <Route path="/birdsound" element={<BirdSounds />} />
      {/* add more routes here as needed */}
    </Routes>
  );
}

export default App;
