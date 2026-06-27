import ProgressBar from "./ProgressBar";

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

  return (
    <div className="viewer">
      <ProgressBar progress={progress} />

      <button className="close-btn" onClick={closeViewer}>
        ✕
      </button>

      <div className="viewer-left" onClick={previousStory} />

      <div className="viewer-right" onClick={nextStory} />

      <img src={stories[currentStoryIndex].image} alt="story" />
    </div>
  );
}

export default StoryViewer;
