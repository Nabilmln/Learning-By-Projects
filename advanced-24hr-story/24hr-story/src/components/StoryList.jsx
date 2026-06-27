function StoryList({ stories, onOpen }) {
  return (
    <div className="story-list">
      {stories.map((story, index) => (
        <StoryItem key={story.id} story={story} index={index} onOpen={onOpen} />
      ))}
    </div>
  );
}
