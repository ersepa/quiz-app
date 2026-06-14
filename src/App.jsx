import { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./App.css";

function App() {
  const [start, setStart] = useState(!!localStorage.getItem("quizData"));
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(savedUser);
    }

    const savedQuiz = localStorage.getItem("quizData");

    if (savedQuiz) {
      setStart(true);
    }
  }, []);

  if (!start) {
    return <Home setStart={setStart} />;
  }

  return (
    <>
      {!user ? (
        <Login setUser={setUser} />
      ) : result ? (
        <Result
          result={result}
          setResult={setResult}
          setUser={setUser}
          setStart={setStart}
        />
      ) : (
        <Quiz user={user} setResult={setResult} />
      )}
    </>
  );
}

export default App;
