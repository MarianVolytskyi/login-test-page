import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import TablePage from "./components/TablePage";
import { useState } from "react";

function App() {
  const [auth, setAuth] = useState(false);
  
  return (
    <Router basename={"/login-test-page"}>
      <div className="App container">
      <Routes>
          <Route
            path="/"
            element={
              <LoginForm login={setAuth} />
            }
          />
          {auth ? (
            <Route
              path="/table"
              element={
                <TablePage />
              }
            />
          ) : (
            <Route
              path="/table"
              element={
                <Navigate to="/" />
              }
            />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;