import { useState, useRef } from 'react';
import './keanu.css';
import BackButton from './BackButton';

function Keanu() {
  const [whoaData, setWhoaData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const fetchWhoa = async () => {
    setLoading(true);
    setError(null);
    setVideoUrl(null);
    setWhoaData(null);
    setIsPlaying(true);
    setIsMuted(false);

    try {
      const res = await fetch('https://whoa.onrender.com/whoas/random');
      const [data] = await res.json();
      const vid = data.video && (data.video['1080p'] || data.video['720p'] || data.video['480p']);
      if (!vid) throw new Error('No video available');

      setVideoUrl(vid);
      setWhoaData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="wrapper">
      <BackButton />
      <h1>Keanu’s Whoa!</h1>

      {videoUrl && (
        <div className="video-container">
          <video
            className="whoa-video"
            src={videoUrl}
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
          />
          <div className="video-controls">
            <button className="gb" onClick={togglePlayback}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="gb" onClick={toggleMute}>
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </div>
      )}

      {whoaData && (
        <div className="whoa-details">
          <p><strong>Movie:</strong> {whoaData.movie}</p>
          <p><strong>Release:</strong> {whoaData.year} — {whoaData.release_date}</p>
          <p><strong>Director:</strong> {whoaData.director}</p>
          <p><strong>Character:</strong> {whoaData.character}</p>
          <p><strong>Duration:</strong> {whoaData.movie_duration}</p>
          <p><strong>Timestamp:</strong> {whoaData.timestamp}</p>
          <p><strong>Line:</strong> {whoaData.full_line}</p>
          <p><strong>Whoa Count:</strong> {whoaData.current_whoa_in_movie} / {whoaData.total_whoas_in_movie}</p>
        </div>
      )}

      <button className="gb" onClick={fetchWhoa} disabled={loading}>
        {loading ? 'Loading...' : 'Whoa!'}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Keanu;
