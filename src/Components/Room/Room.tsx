import * as React from "react";

interface RoomProps {
  roomId: number;
}

const Room: React.FC<RoomProps> = ({ roomId }) => {
  const [message, setMessage] = React.useState("");
  return (
    <div className="w-screen h-screen ">
      <h1>{roomId}</h1>
      <div className="flex justify-center items-center flex-col">
        <input
          className="bg-black text-white"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>
    </div>
  );
};
export default Room;
