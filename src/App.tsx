import * as React from "react";
import Choose from "./Components/Choose/Choose.tsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Room from "./Components/Room/Room.tsx";

function App() {
  const [room, setRoom] = React.useState(0);
  const useCallback = (childprop) => {
    setRoom(childprop);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Choose useCallback={useCallback} />} />
        <Route path={`/room-${room}`} element={<Room roomId={room} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
