import { useState } from 'react';
import './BirdSounds.css';
import BackButton from './BackButton';

function BirdSounds() {
  const [query, setQuery] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBirdSound = async () => {
    setLoading(true);
    setError(null);
    setAudioUrl(null);
    setDetails(null);

    try {
      const res = await fetch(`https://xeno-canto.org/api/2/recordings?query=${query}`);
      const data = await res.json();

      if (data.recordings.length === 0) throw new Error('No results found');

      const bird = data.recordings[0];
      setAudioUrl(`https:${bird.file}`);
      setDetails({
        en: bird.en,
        genus: bird.gen,
        species: bird.sp,
        location: bird.loc,
        date: bird.date,
        author: bird.rec,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <BackButton />
      <h1 className="btitle">Bird sounds</h1>

      {audioUrl && (
        <audio
          className="audio-player"
          controls
          src={audioUrl}
        />
      )}

      {details && (
        <div className="details-box">
          <p><strong>Common name:</strong> {details.en}</p>
          <p><strong>Genus:</strong> {details.genus}</p>
          <p><strong>Species:</strong> {details.species}</p>
          <p><strong>Location:</strong> {details.location}</p>
          <p><strong>Date:</strong> {details.date}</p>
          <p><strong>Recorded by:</strong> {details.author}</p>
        </div>
      )}

      <div className="input-container">
        <input
          type="text"
          placeholder="search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <button className="gb" onClick={fetchBirdSound} disabled={loading}>
        {loading ? 'Loading...' : 'generate'}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default BirdSounds;
