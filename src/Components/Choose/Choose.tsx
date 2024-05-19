import * as React from "react";
import { useNavigate } from "react-router-dom";

const Choose: React.FC = () => {
  const [room, setRoom] = React.useState(0);
  const [user, setUser] = React.useState("");

  const navigate = useNavigate();

  const useSubmit = (e) => {
    e.preventDefault();
    navigate(`/room/${room}?user=${user}`);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="content-center">Select your room</h1>
      <form onSubmit={useSubmit}>
        <div className="flex flex-row">
          <button type="button" onClick={(e) => setRoom(room + 1)}>
            +
          </button>
          <p>{room}</p>
          <button type="button" onClick={(e) => setRoom(room - 1)}>
            -
          </button>
        </div>
        <div>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <button type="submit">Chat</button>
      </form>
    </div>
  );
};
export default Choose;
