import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const categories = [
  "waifu",
  "neko",
  "shinobu",
  "megumin",
  "bully",
  "cuddle",
  "cry",
  "hug",
  "awoo",
  "kiss",
  "lick",
  "pat",
  "smug",
  "bonk",
  "yeet",
  "blush",
  "smile",
  "wave",
  "highfive",
  "handhold",
  "nom",
  "bite",
  "glomp",
  "slap",
  "kill",
  "kick",
  "happy",
  "wink",
  "poke",
  "dance",
  "cringe",
];

function App() {
  const [category, setCategory] = useState(categories[0]);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImage = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);
    try {
      const response = await fetch(`https://api.waifu.pics/sfw/${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const data = await response.json();
      setImageUrl(data.url);
    } catch (err) {
      setError(err.message || "Error fetching image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='wrapper'>
      <h1>Waifu Image Generator</h1>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='category'
        
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <br />
      <button className='gb' onClick={fetchImage}>
        Generate
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {imageUrl && (
        <div className='image'>
          <img src={imageUrl} alt={category} style={{ maxWidth: "100%", borderRadius: 8 }} />
        </div>
      )}
    </div>
  );
}

export default App
