// import { useState, useEffect } from "react";
import "./styles/App.css";
import { useStories } from "./hooks/useStories";
import UploadButton from "./components/UploadButton";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";

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
    <header className="header">
      <h1>24hr Stories</h1>
      <p>Share moments that disappear after 24 hours.</p>
    </header>

    <main>
      {uploading && (
        <div className="status-message">
          Uploading story...
        </div>
      )}

      <div className="story-container">
        <UploadButton onUpload={handleUpload} />
        <StoryList
          stories={stories}
          onOpen={openStory}
        />
      </div>

      {stories.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📷</div>

          <h2>No Stories Yet</h2>

          <p>
            Upload your first story and share your
            favorite moments.
          </p>
        </div>
      )}
    </main>

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
);return (
  <div className="app">
    <header className="header">
      <h1>24hr Stories</h1>
      <p>Share moments that disappear after 24 hours.</p>
    </header>

    <main>
      {uploading && <div className="status-message">Uploading story...</div>}

      <div className="story-container">
        <UploadButton onUpload={handleUpload} />
        <StoryList stories={stories} onOpen={openStory} />
      </div>

      {stories.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📷</div>

          <h2>No Stories Yet</h2>

          <p>Upload your first story and share your favorite moments.</p>
        </div>
      )}
    </main>

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
