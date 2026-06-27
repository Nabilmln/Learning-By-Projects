function StoryItem({ story, index, onOpen,}) {
    
  return (
    <img
      src={story.image}
      className={story.viewed ? "story-circle viewed" : "story-circle"}
      onClick={() => onOpen(index)}
      alt="story"
    />
  );
}

export default StoryItem;
