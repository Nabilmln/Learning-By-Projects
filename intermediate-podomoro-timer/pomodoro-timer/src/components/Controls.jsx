function Controls({ onStart, onPause, onReset, isRunning }) {
  return (
    <div className="controls">
      <button aria-label="Start timer" disabled={isRunning} onClick={onStart}>
        {" "}
        Start{" "}
      </button>
      <button aria-label="Pause timer" disabled={!isRunning} onClick={onPause}>
        {" "}
        Pause{" "}
      </button>
      <button aria-label="Reset timer" onClick={onReset}>
        {" "}
        Restart{" "}
      </button>
    </div>
  );
}
export default Controls;