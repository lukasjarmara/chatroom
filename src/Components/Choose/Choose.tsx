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
      <form onSubmit={useSubmit}>
        <div>
          <label
            htmlFor="roomNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Select your room
          </label>
          <input
            id="roomNumber"
            type="number"
            value={room}
            onChange={(e) => setRoom(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></input>
        </div>
        <div className="mt-4">
          <label
            htmlFor="userInput"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            id="userInput"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Chat
        </button>
      </form>
    </div>
  );
};
export default Choose;
