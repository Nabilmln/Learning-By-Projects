import { useState, useEffect, useRef} from 'react'
import Timer from './components/Timer';
import Controls from './components/Controls';
import SessionInfo from './components/SessionInfo';
import Settings from './components/Settings';
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [settings, setSettings] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const alarmRef = useRef (new Audio("/alarm.mp3"));

  const formatTime = () => {
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

const switchSession = () => {
  if (sessionType === "work") {
    const nextCompleted = completedSessions + 1;

    setCompletedSessions(nextCompleted);

    if (nextCompleted % 4 === 0) {
      setSessionType("longBreak");

      setTimeLeft(settings.longBreak * 60);
    } else {
      setSessionType("shortBreak");

      setTimeLeft(settings.shortBreak * 60);
    }
  } else {
    setSessionType("work");

    setTimeLeft(settings.work * 60);
  }
};

  
  useEffect(() => {
    if(isRunning){
      const interval = setInterval(() => {
        // setTimeLeft(prevTime => prevTime - 1);
        setTimeLeft(prev => {
          if(prev <= 1){
            setIsRunning(false);
            alarmRef.current.play();
            switchSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    document.title = `${formatTime()} - ${
      sessionType === "work"
        ? "Work"
        : sessionType === "shortBreak"
          ? "Short Break"
          : "Long Break"
    }`;
  }, [timeLeft, sessionType]);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>

      <SessionInfo
        sessionType={sessionType}
        completedSessions={completedSessions}
      />
      <Timer time={formatTime()} />
      <Controls
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={() => {
          setIsRunning(false);
          setSessionType("work");
          setCompletedSessions(0);
          setTimeLeft(settings.work * 60);
        }}
      />
      <Settings settings={settings} setSettings={setSettings} />
    </div>
  );
}

export default App
