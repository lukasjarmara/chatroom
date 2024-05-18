import * as React from "react";
import { db } from "../../firebase";
import { ref, set, onValue } from "firebase/database";
import { useParams, useLocation } from "react-router-dom";

const Room: React.FC = () => {
  const { roomId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const user = query.get("user");
  const [response, setResponse] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const query = ref(db, `/${roomId}`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      setMessages(data);
      console.log(data);
    });
  }, [roomId]);

  return (
    <div className="w-screen h-screen ">
      <h1>{roomId}</h1>
      <div className="flex justify-center items-center flex-col">
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
