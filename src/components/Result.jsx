function Result({ result, setResult, setUser, setStart }) {
  const score = Math.round((result.correct / result.total) * 100);

  return (
    <div className="container">
      <h1>🎉 Quiz Finished</h1>

      <h2>Score: {score}%</h2>

      <h3>✅ Correct: {result.correct}</h3>
      <h3>❌ Wrong: {result.wrong}</h3>
      <h3>📝 Answered: {result.answered}</h3>

      <button onClick={() => setResult(null)}>Restart Quiz</button>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          setResult(null);
          setUser(null);
          setStart(false);
        }}
      >
        Back To Menu
      </button>
    </div>
  );
}

export default Result;
