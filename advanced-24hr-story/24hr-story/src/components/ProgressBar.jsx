function ProgressBar({ progress, currentStoryIndex, stories }) {
  return (
    <div className="progress-container">
      {stories.map((story, index) => (
        <div className="progress-segment" key={story.id}>
          <div
            className="progress-fill"
            style={{
              width:
                index < currentStoryIndex
                  ? "100%"
                  : index === currentStoryIndex
                    ? `${progress}%`
                    : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;