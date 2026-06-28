import { useState, useEffect } from "react";
import "./App.css";
import { resizeImage } from "./utils/imageResize";
import { loadStories, saveStories } from "./utils/storyStorage";

function App() {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const resizedImage = await resizeImage(file);

      const newStory = {
        id: Date.now(),
        image: resizedImage,
        createdAt: Date.now(),
        viewed: false,
      };

      const updatedStories = [...stories, newStory];

      setStories(updatedStories);

      saveStories(updatedStories);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);

      e.target.value = "";
    }
  };

  const openStory = (index) => {
    markStoryAsViewed(index);
    setCurrentStoryIndex(index);
    setProgress(0);
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
      setProgress(0);
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
    const savedStories = loadStories() || [];
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
