function Navigation({ isFlipped, onFlip, onNext, onPrevious, isFirst, isLast }) {
    return (
      <div className="navigation">
        <button
          className="nav-link"
          onClick={onPrevious}
          disabled={isFirst}
        >
          Previous
        </button>
  
        <button className="btn-primary" onClick={onFlip}>
          {isFlipped ? 'Hide Answer' : 'Show Answer'}
        </button>
  
        <button
          className="nav-link"
          onClick={onNext}
          disabled={isLast}
        >
          Next &gt;
        </button>
      </div>
    );
  }
  
  export default Navigation;