import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const MAX_WIDTH = 1080;
        const MAX_HEIGHT = 1920;
        
        let width = img.width;
        let height = img.height;
        
        if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
          
          
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          ctx.drawImage(img, 0, 0, width, height);
          
          const resizedImage = canvas.toDataURL("image/jpeg", 0.8);

          const newStory = {
            id: Date.now(),
            image: resizedImage,
            createdAt: Date.now(),
            viewed: false,
          };
    
          const updatedStories = [...stories, newStory];
    
          setStories(updatedStories);
          localStorage.setItem("stories", JSON.stringify(updatedStories));
        }
        e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  const nextStory = () => {
    setProgress(0);
    if (currentStoryIndex === null) return;

    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      setCurrentStoryIndex(null);
    }

    const nextIndex = currentStoryIndex + 1;
    if (nextIndex < stories.length) {
      markStoryAsViewed(nextIndex);
    }
  };

  const previousStory = () => {
    if (currentStoryIndex === null) return;

    if (currentStoryIndex > 0){
      setCurrentStoryIndex(currentStoryIndex -1);
    }
  };

  const markStoryAsViewed = (index) => {
    const updatedStories = [...stories];
    updatedStories[index].viewed = true;
    setStories(updatedStories);
    localStorage.setItem("stories", JSON.stringify(updatedStories));
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
    if (progress >= 100){
      nextStory();
    } 
  },[progress]);

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
      {stories.length === 0 && <p>No stories yet. Upload your first story!</p>}
      {/* <input type="file" accept="image/*" onChange={handleUpload} /> */}

      <label className="upload-story">
        +
        <input type="file" accept="image/*" onChange={handleUpload} hidden />
      </label>

      {uploading && <p>Uploading...</p>}

      <div className="story-list">
        {stories.map((story, index) => (
          <img
            key={story.id}
            src={story.image}
            alt="story"
            className={story.viewed ? "story-circle viewed" : "story-circle"}
            onClick={() => {
              markStoryAsViewed(index);
              setCurrentStoryIndex(index);
            }}
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

          <div className="viewer-left" onClick={previousStory} />
          <div className="viewer-right" onClick={nextStory} />

          <img src={stories[currentStoryIndex]?.image} alt="story" />
        </div>
      )}
    </div>
  );
}

export default App;
