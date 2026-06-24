import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [stories, setStories] = useState([]);

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

    setStories(savedStories);
  }, []);

  return (
    <>
      <input type="file" accept="image/*" onChange={handleUpload} />
      <div className="story-list">
        {stories.map((story) => (
          <img
            key={story.id}
            src={story.image}
            alt="story"
            className="story-circle"
          />
        ))}
      </div>
    </>
  );
}

export default App
