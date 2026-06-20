import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState(1500);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div>
      <h1>Podomoro Timer</h1>

      <h2>{formatTime()}</h2>

      <button onClick={() => setTimeLeft(timeLeft - 1)}> Kurangi </button>
    </div>
  );
}

export default App
