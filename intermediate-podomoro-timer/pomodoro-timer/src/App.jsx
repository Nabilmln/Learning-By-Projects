import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('work');
  const [completeSessions, setCompleteSessions] = useState(0);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  const switchSession = () => {
    if(sessionType === "work"){

      const newComplete = completeSessions + 1;
      setCompleteSessions(newComplete);

      if(newComplete % 4 === 0) {
        setSessionType("LongBreak");
        setTimeLeft(15*60);
      } else {
        setSessionType("ShortBreak");
        setTimeLeft(5*60);
        }
      }
      else {
        setSessionType("work");
        setTimeLeft(25*60);
    }
  };

  useEffect(() => {
    if(isRunning){
      const interval = setInterval(() => {
        // setTimeLeft(prevTime => prevTime - 1);
        setTimeLeft(prevTime => {
          if(prevTime <= 1){
            setIsRunning(false);
            switchSession();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div>
      <h1>Podomoro Timer</h1>
      <h2>{sessionType === "work" ? "Work Sessions": sessionType === "shortBreak" ? "Short Break" : "Long Break"}</h2>
      <h2>{formatTime()}</h2>

      <button onClick={() => setIsRunning(true)}> Start </button>
      <button onClick={() => setIsRunning(false)}> Pause </button>
      <button onClick={() => {setIsRunning(false); setSessionType("work"); setCompleteSessions(0); setTimeLeft(25*60);}}>Restart</button>
      <p> Complete Sessions: {completeSessions}</p>
    

    </div>
  );
}

export default App
