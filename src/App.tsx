import * as React from "react";
import Choose from "./Components/Choose/Choose";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Choose />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
