import * as React from "react";
import Choose from "./Components/Choose/Choose.tsx";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Room from "./Components/Room/Room.tsx";

function App() {
  const [room, setRoom] = React.useState(0);
  const [user, setUser] = React.useState("");
  const useCallback = (childprop) => {
    setRoom(childprop.room);
    setUser(childprop.user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Choose useCallback={useCallback} />} />
        <Route
          path={`/room/:roomId`}
          element={<Room roomId={room} user={user} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
