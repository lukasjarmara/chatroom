import * as React from "react";

interface RoomProps {
  roomId: number;
}

const Room: React.FC<RoomProps> = ({ roomId }) => {
  return (
    <div>
      <p>{roomId}</p>
    </div>
  );
};
export default Room;
