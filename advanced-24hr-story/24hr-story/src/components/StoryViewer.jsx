import { useRef, useEffect} from "react";
import ProgressBar from "./ProgressBar";
import "../styles/StoryViewer.css";

function StoryViewer({
  stories,
  currentStoryIndex,
  progress,
  nextStory,
  previousStory,
  closeViewer,
}) {
  if (currentStoryIndex === null || !stories[currentStoryIndex]) {
    return null;
  }

  const isOpen = currentStoryIndex !== null;
  const touchStartX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;

    const distance = touchStartX.current - touchEndX;

    const threshold = 50;

    if (distance > threshold) {
      nextStory();
    }

    if (distance < -threshold) {
      previousStory();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentStoryIndex === null) return;

      if (e.key === "ArrowRight") {
        nextStory();
      }

      if (e.key === "ArrowLeft") {
        previousStory();
      }

      if (e.key === "Escape") {
        closeViewer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStoryIndex, nextStory, previousStory, closeViewer]);

  return (
    <div
      className={`viewer ${isOpen ? "show" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ProgressBar
        stories={stories}
        currentStoryIndex={currentStoryIndex}
        progress={progress}
      />

      <div className="viewer-header">
        <div className="viewer-info">
          <div className="viewer-avatar">📷</div>

          <div className="viewer-text">
            <h3>Your Story</h3>
            <span>
              Story {currentStoryIndex + 1} of {stories.length}
            </span>
          </div>
        </div>

        <button
          className="close-btn"
          onClick={closeViewer}
          aria-label="Close story viewer"
        >
          ✕
        </button>
      </div>

      <div className="viewer-left" onClick={previousStory} />

      <div className="viewer-right" onClick={nextStory} />

      <img
        src={stories[currentStoryIndex].image}
        alt={`Story ${currentStoryIndex + 1}`}
      />
    </div>
  );
}

export default StoryViewer;
