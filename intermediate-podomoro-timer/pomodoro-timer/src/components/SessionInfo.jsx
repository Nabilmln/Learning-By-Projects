function sessionInfo({sessionType, completedSessions}){
    return (
      <div className="session-info">
        <h2>
          {sessionType === "work"
            ? "Work Sessions"
            : sessionType === "shortBreak"
              ? "Short Break"
              : "Long Break"}
        </h2>
        <p> Complete Sessions: {completedSessions}</p>
        <p>
          Cycle Progress:
          {completedSessions % 4}/4
        </p>
      </div>
    );

}

export default sessionInfo;