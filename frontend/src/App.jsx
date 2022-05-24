import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Suspense fallback="loading">
        <div className="App">
          <Routes>
            <Route path="/" element={<div>Welcome</div>} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;
