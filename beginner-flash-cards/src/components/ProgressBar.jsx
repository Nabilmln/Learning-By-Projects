function ProgressBar({ current, total, progress }) {
    return (
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="progress-labels">
          <span>{progress}%</span>
          <span>{current} of {total}</span>
        </div>
      </div>
    );
  }
  
  export default ProgressBar;