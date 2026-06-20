function Controls ({ onStart, onPause, onRestart }){
    return (
      <>
        {/* <button onClick={() => setIsRunning(true)}> Start </button>
        <button onClick={() => setIsRunning(false)}> Pause </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSessionType("work");
            setCompleteSessions(0);
            setTimeLeft(25 * 60);
          }}
        >
          Restart
        </button> */}
        <button onClick={onStart}> Start </button>
        <button onClick={onPause}> Pause </button>
        <button onClick={onRestart}> Restart </button>
      </>
    );
}
export default Controls;