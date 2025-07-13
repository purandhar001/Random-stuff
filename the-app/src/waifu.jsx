import { useState } from 'react';
import './waifu.css';
import BackButton from './BackButton';

const sfwCategories = [
  "waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry", "hug", "awoo", "kiss",
  "lick", "pat", "smug", "bonk", "yeet", "blush", "smile", "wave", "highfive", "handhold",
  "nom", "bite", "glomp", "slap", "kill", "kick", "happy", "wink", "poke", "dance", "cringe"
];

const nsfwCategories = ["waifu", "neko", "blowjob"];
const catModeCategory = ["cats"];

function Waifu() {
  const [category, setCategory] = useState(sfwCategories[0]);
  const [categories, setCategories] = useState(sfwCategories);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNsfw, setIsNsfw] = useState(false);
  const [isCatMode, setIsCatMode] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const fetchImage = async () => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      if (isCatMode) {
        setImageUrl("https://cataas.com/cat/cute/says/nice%20try%20bro!");
      } else {
        const type = isNsfw ? "nsfw" : "sfw";
        const response = await fetch(`https://api.waifu.pics/${type}/${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const data = await response.json();
        setImageUrl(data.url);
      }
    } catch (err) {
      setError(err.message || "Error fetching image");
    } finally {
      setLoading(false);
    }
  };

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 7) {
      const isAdult = window.confirm("Are you 18 years old or above?");
      if (isAdult) {
        setIsNsfw(true);
        setIsCatMode(false);
        setCategories(nsfwCategories);
        setCategory(nsfwCategories[0]);
      } else {
        setIsCatMode(true);
        setIsNsfw(false);
        setCategories(catModeCategory);
        setCategory("cats");
      }
    }
  };

  return (
    <div className="wrapper">
      <BackButton />
      <h1 onClick={handleTitleClick}>Waifu Generator</h1>

      {imageUrl && (
          <img className='image' src={imageUrl} alt={category} />
      )}

      <select className="category" value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <br />

      <button className="gb" onClick={fetchImage}>
        Generate
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Waifu;
