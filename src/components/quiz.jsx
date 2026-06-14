import { useEffect, useState } from "react";

function Quiz({ setResult }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const savedQuiz = JSON.parse(localStorage.getItem("quizData"));

    if (savedQuiz) {
      setQuestions(savedQuiz.questions);
      setCurrent(savedQuiz.current);
      setCorrect(savedQuiz.correct);
      setAnswered(savedQuiz.answered);
      setTimeLeft(savedQuiz.timeLeft);
      return;
    }

    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.results.map((q) => ({
          ...q,
          answers: shuffle([...q.incorrect_answers, q.correct_answer]),
        }));

        setQuestions(formatted);
      });
  }, []);

  useEffect(() => {
    if (!questions.length) return;

    localStorage.setItem(
      "quizData",
      JSON.stringify({
        questions,
        current,
        correct,
        answered,
        timeLeft,
      }),
    );
  }, [questions, current, correct, answered, timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  };

  const answerQuestion = (answer) => {
    if (answer === questions[current].correct_answer) {
      setCorrect((prev) => prev + 1);
    }

    setAnswered((prev) => prev + 1);

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    localStorage.removeItem("quizData");

    setResult({
      correct,
      wrong: answered - correct,
      answered,
      total: questions.length,
    });
  };

  if (!questions.length) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="timer">⏰ {timeLeft}s</div>

      <div className="progress">
        <div
          className="progress-bar"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>

      <h3>
        Soal {current + 1} / {questions.length}
      </h3>

      <p>Total Dikerjakan: {answered}</p>

      <div
        className="question"
        dangerouslySetInnerHTML={{
          __html: questions[current].question,
        }}
      />

      {questions[current].answers.map((answer, index) => (
        <button key={index} onClick={() => answerQuestion(answer)}>
          <span
            dangerouslySetInnerHTML={{
              __html: answer,
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default Quiz;
