// import { useState, useEffect } from "react";
import "./App.css";
import { useStories } from "./hooks/useStories";
// import { resizeImage } from "./utils/imageResize";
// import { loadStories, saveStories } from "./utils/storyStorage";

function App() {

  const {
    stories,
    uploading,
    progress,
    currentStoryIndex,
    handleUpload,
    nextStory,
    previousStory,
    openStory,
    setCurrentStoryIndex,
    setProgress,
  } = useStories();

  return (
    <div className="app">
      <h1>24hr Stories</h1>
      {stories.length === 0 && <p>No stories yet. Upload your first story!</p>}

      {uploading && <p>Uploading...</p>}
      <div className="story-container">

        <UploadButton onUpload={handleUpload} />
        <StoryList stories={stories} onOpen={openStory} />
      </div>

      <StoryViewer
        stories={stories}
        currentStoryIndex={currentStoryIndex}
        progress={progress}
        nextStory={nextStory}
        previousStory={previousStory}
        closeViewer={() => {
          setCurrentStoryIndex(null);
          setProgress(0);
        }}
      />
    </div>
  );
}

export default App;
