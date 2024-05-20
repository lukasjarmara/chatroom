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
    set(ref(db, `/room-${roomId}/${lastMessage + 1}`), {
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
          <div className="flex flex-col justify-between">
            <h1 className="text-3xl font-bold mb-4 self-center">{roomId}</h1>
            <div className="flex flex-col items-start">
              <div className="flex flex-col gap-2">
                {messages.map((message, index) => (
                  <div key={index}>
                    <label className="font-bold text-sm">{message.user}</label>
                    <p className="text-gray-600 text-xl">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="fixed bottom-5 flex gap-2 w-full justify-center"
            >
              <input
                className="bg-slate-800 text-white py-2 rounded"
                onChange={(e) => setResponse(e.target.value)}
                value={response}
              />
              <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
                <span className="material-symbols-outlined align-middle">
                  send
                </span>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
export default Room;
