function sessionInfo({sessionType, completeSessions}){
    return (
    <>
        <h2>
            {sessionType === "work"
            ? "Work Sessions"
            : sessionType === "shortBreak"
            ? "Short Break"
            : "Long Break"}
        </h2>
        <p> Complete Sessions: {completeSessions}</p>
    </>
    );

}

export default sessionInfo;