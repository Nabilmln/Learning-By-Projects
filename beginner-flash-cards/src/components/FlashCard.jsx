function FlashCard({ question, answer, isFlipped }) {
    return (
      <div className="flashcard">
        <p>{isFlipped ? answer : question}</p>
      </div>
    );
  }
  
  export default FlashCard;