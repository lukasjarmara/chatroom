import * as React from "react";
import { db } from "../../firebase";
import { ref, set, onValue } from "firebase/database";
interface RoomProps {
  roomId: number;
  user: string;
}

const Room: React.FC<RoomProps> = ({ roomId, user }) => {
  const [response, setResponse] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    const resp = ref(db, `${roomId}`);
    onValue(resp, (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
      console.log(messages);
    });
  }, []);
  return (
    <div className="w-screen h-screen ">
      <h1>{roomId}</h1>
      <div className="flex justify-center items-center flex-col">
        {}
        <input
          className="bg-black text-white"
          onChange={(e) => setResponse(e.target.value)}
          value={response}
        />
      </div>
    </div>
  );
};
export default Room;
