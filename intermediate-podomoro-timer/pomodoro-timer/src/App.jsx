import { useState, useEffect } from 'react'
import Timer from './components/Timer';
import Controls from './components/Controls';
import SessionInfo from './components/SessionInfo';
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
      <SessionInfo sessionType={sessionType} completeSessions={completeSessions} />
      <Timer timeLeft={formatTime()} />
      <Controls 
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false);
          setTimeLeft(sessionType === "work" ? 25*60 : sessionType === "ShortBreak" ? 5*60 : 15*60);
        }
      } />

    </div>
  );
}

export default App
