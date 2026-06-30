
function StoryItem({ story, index, onOpen }) {
  return (
    <div className="story-item" onClick={() => onOpen(index)}>
      <div className="story-ring">
        <img
          src={story.image}
          alt="Story"
          className={`story-circle ${story.viewed ? "viewed" : ""}`}
        />
      </div>

      <span>Story</span>
    </div>
  );
}

export default StoryItem;
