import * as React from "react";

interface ChooseProps {
  handleCallback: (room: number) => void;
}
const Choose: React.FC<ChooseProps> = ({ handleCallback }) => {
  const [room, setRoom] = React.useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCallback(room);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <h1 className="content-center">Select your room</h1>
      <form onSubmit={handleSubmit}>
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
