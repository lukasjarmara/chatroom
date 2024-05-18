import * as React from "react";
import Choose from "./Components/Choose/Choose.tsx";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Room from "./Components/Room/Room.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Choose />} />
        <Route path={`/room/:roomId`} element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
