import React, { useState } from 'react';
import BackButton from './BackButton';
import './Dragonball.css';

function Dragonball() {
  const [name, setName] = useState('cat');
  const [img, setImg] = useState('/cat.jpeg');
  const [character, setCharacter] = useState({
    name: 'cat',
    ki: "0",
    totalKi: "0",
    race: "asteroid destroyer"
  });

  async function fetchData(name) {
    const url = "https://dragonball-api.com/api/characters?name=" + name
    const response = (await fetch(url))
    const data = await response.json()
    console.log(data)
    setImg(data[0].image)
    setCharacter({ name: data[0].name, ki: data[0].ki, totalKi: data[0].maxKi, race: data[0].race })
    console.log(url)
  }

  return (
    <div className="wrapper">
      <BackButton />
      <h1 className="title">Dragonball character generator</h1>
        <img className='image' src={img} alt="it's an image" />
      <div className="details">
        <h2 className="character-name">{character.name}</h2>
        <p>Ki: {character.ki} <br /> Total Ki: {character.totalKi} <br /> Race: {character.race}</p>
      </div>
      <div className="input-container">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        
      </div>
      <button className="gb" onClick={() => fetchData(name)}>Confirm</button>
    </div>
  )
}

export default Dragonball;