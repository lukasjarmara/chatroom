import * as React from "react";
import { db } from "../../firebase";
import { ref, set, onValue } from "firebase/database";
import { useParams, useLocation } from "react-router-dom";
interface Message {
  message: string;
  user: string;
}
const Room: React.FC = () => {
  const { roomId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const user = query.get("user");
  const [response, setResponse] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    const query = ref(db, `/room-${roomId}`);
    return onValue(query, (snapshot) => {
      const data = snapshot.val();
      const messagesArray: Message[] = Object.values(data || {});
      setMessages(messagesArray);
    });
  }, [roomId]);

  return (
    <div className="w-screen h-screen ">
      <h1>{roomId}</h1>
      <div className="flex justify-center items-center flex-col">
        {messages.map((message, index) => (
          <div key={index}>
            <p>
              {message.user}: {message.message}
            </p>
          </div>
        ))}
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
