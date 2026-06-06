import { useState } from 'react';
import { flashcards } from '/src/data/flashcards';
import ProgressBar from '/src/components/ProgressBar';
import FlashCard from '/src/components/FlashCard';
import Navigation from '/src/components/Navigation';
import './App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = flashcards[currentIndex];
  const total = flashcards.length;
  const progress = Math.round(((currentIndex + 1) / total) * 100);

  function handleNext() {
    if (currentIndex < total - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false); // reset ke question saat pindah kartu
    }
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  }

  function toggleFlip() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className="container">
      <h1>Flash Cards</h1>

      <ProgressBar
        current={currentIndex + 1}
        total={total}
        progress={progress}
      />

      <FlashCard
        question={currentCard.question}
        answer={currentCard.answer}
        isFlipped={isFlipped}
      />

      <Navigation
        isFlipped={isFlipped}
        onFlip={toggleFlip}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isFirst={currentIndex === 0}
        isLast={currentIndex === total - 1}
      />
    </div>
  );
}

export default App;