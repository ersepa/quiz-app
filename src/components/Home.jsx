function Home({ setStart }) {
  return (
    <div className="container home-card">
      <h1>🧠 React Quiz App</h1>

      <p>Test your knowledge with trivia questions.</p>

      <button className="start-btn" onClick={() => setStart(true)}>
        Start Quiz
      </button>
    </div>
  );
}

const hasQuiz = localStorage.getItem("quizData");
<button className="start-btn" onClick={() => setStart(true)}>
  {hasQuiz ? "Resume Quiz" : "Start Quiz"}
</button>;

export default Home;
