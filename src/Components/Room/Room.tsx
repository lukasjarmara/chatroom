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
  const [isLoading, setIsLoading] = React.useState(true);
  const location = `/room-${roomId}`;
  const [lastMessage, setLastMessage] = React.useState(0);

  React.useEffect(() => {
    return onValue(ref(db, location), (snapshot) => {
      const data = snapshot.val();
      const messagesArray: Message[] = Object.values(data || {});
      setMessages(messagesArray);
      setIsLoading(false);
    });
  }, [roomId, location]);
  React.useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages.length);
    }
  }, [messages]);
  const handleSubmit = (e) => {
    e.preventDefault();
    set(ref(db, `/room-${roomId}/message-${lastMessage + 1}`), {
      message: response,
      user: user,
    });
    setResponse("");
  };

  return (
    <div className="w-screen h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>{" "}
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-between items-center">
            <h1>{roomId}</h1>
            <div>
              {messages.map((message, index) => (
                <div key={index}>
                  <label>{message.user}</label>
                  <p> {message.message}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="fixed bottom-5">
              <input
                className="bg-black text-white"
                onChange={(e) => setResponse(e.target.value)}
                value={response}
              />
              <button>
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
export default Room;
