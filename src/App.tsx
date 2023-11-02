import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import TablePage from "./components/TablePage";
import { useState, useEffect } from "react";

function App() {
  const [auth, setAuth] = useState(() => {
    const authStatus = localStorage.getItem("auth");
    return authStatus ? JSON.parse(authStatus) : false;
  });

  useEffect(() => {
    const authStatus = localStorage.getItem("auth");
    if (authStatus) {
      setAuth(JSON.parse(authStatus));
    }
  }, []);

  const handleLogin = (value:boolean) => {
    setAuth(value);
    localStorage.setItem("auth", JSON.stringify(value));
  };

  return (
    <Router basename={"/login-test-page"}>
      <div className="App container">
        <Routes>
          <Route
            path="/"
            element={<LoginForm login={handleLogin} />}
          />
          {auth ? (
            <Route
              path="/table"
              element={<TablePage login={handleLogin}/>}
            />
          ) : (
            <Route
              path="/table"
              element={<Navigate to="/" />}
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
