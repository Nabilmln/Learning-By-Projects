import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const ONE_DAY = 24 * 60 * 60 * 1000;

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const newStory = {
        id: Date.now(),
        image: reader.result,
        createdAt: Date.now(),
      };

      const updatedStories = [...stories, newStory];

      setStories(updatedStories);
      localStorage.setItem("stories", JSON.stringify(updatedStories));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const savedStories = JSON.parse(localStorage.getItem("stories")) || [];
    const validStories = savedStories.filter((story) => {
      return Date.now() - story.createdAt < ONE_DAY;
    });
    setStories(validStories);
    localStorage.setItem("stories", JSON.stringify(validStories));
  }, []);

  useEffect(() => {
    if (currentStoryIndex === null) return;
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [currentStoryIndex]);

  useEffect(() => {
    if (progress < 100) return;

    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    } else {
      setCurrentStoryIndex(null);
      setProgress(0);
    }
  }, [progress, currentStoryIndex, stories.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStories((prevStories) => {
        const validStories = prevStories.filter((story) => {
          return Date.now() - story.createdAt < ONE_DAY;
        });
        localStorage.setItem("stories", JSON.stringify(validStories));
        return validStories;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>24hr Stories</h1>

      <input type="file" accept="image/*" onChange={handleUpload} />

      <div className="story-list">
        {stories.map((story, index) => (
          <img
            key={story.id}
            src={story.image}
            alt="story"
            className="story-circle"
            onClick={() => setCurrentStoryIndex(index)}
          />
        ))}
      </div>

      {currentStoryIndex !== null && stories[currentStoryIndex] && (
        <div className="viewer">
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <button
            className="close-btn"
            onClick={() => {
              setCurrentStoryIndex(null);
              setProgress(0);
            }}
          >
            ✕
          </button>

          <img src={stories[currentStoryIndex]?.image} alt="story" />
        </div>
      )}
    </div>
  );
}

export default App;
