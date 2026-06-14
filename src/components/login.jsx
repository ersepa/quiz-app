import { useState } from "react";

function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name) return;

    localStorage.setItem("user", name);
    setUser(name);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>

      <input
        type="text"
        placeholder="Masukkan Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
