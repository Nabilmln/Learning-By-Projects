// import { useState, useEffect } from "react";
import "./styles/App.css";
import { useStories } from "./hooks/useStories";
import UploadButton from "./components/UploadButton";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import { useTheme } from "./hooks/useTheme";

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

  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      <header className="header">
        <h1>24hr Stories</h1>
        <p>Share moments that disappear after 24 hours.</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <main>
        {uploading && (
          <div className="status-message">
            <div className="spinner"></div>

            <span>Uploading your story...</span>
          </div>
        )}

        <div className="story-container">
          <UploadButton aria-label="Upload Story" onUpload={handleUpload} />
          <StoryList stories={stories} onOpen={openStory} />
        </div>

        {stories.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📷</div>

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

      <footer className="footer">Built with React + Vite</footer>
    </div>
  );
}

export default App;
