import * as React from "react";
import { useNavigate } from "react-router-dom";

interface ChooseProps {
  useCallback: (room: number) => void;
}
const Choose: React.FC<ChooseProps> = ({ useCallback }) => {
  const [room, setRoom] = React.useState(0);
  const navigate = useNavigate();

  const useSubmit = (e) => {
    e.preventDefault();
    navigate(`/room/${room}`);
    useCallback(room);
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
        <button type="submit">Chat</button>
      </form>
    </div>
  );
};
export default Choose;
