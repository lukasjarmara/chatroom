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
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
          <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin aling-self-center"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col justify-between min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
              {roomId}
            </h1>
            <div className="flex justify-center flex-grow">
              <div className="flex flex-col gap-4 w-full max-w-3xl p-4 mb-16 bg-white shadow-lg rounded-lg">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 p-3 rounded-lg ${
                      message.user === user
                        ? "bg-blue-100 items-end self-end ml-16"
                        : "bg-gray-200 items-start self-start mr-16"
                    }`}
                  >
                    <p className="font-bold text-sm mb-1 text-blue-800">
                      {message.user}
                    </p>
                    <p className="text-gray-700 text-lg">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="fixed bottom-5 flex gap-2 w-full justify-center px-4"
          >
            <input
              className="bg-white text-gray-900 py-2 px-4 rounded-lg shadow-md w-full max-w-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setResponse(e.target.value)}
              value={response}
              placeholder="Type your message..."
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md">
              <span className="material-symbols-outlined align-middle">
                send
              </span>
            </button>
          </form>
        </>
      )}
    </div>
  );
};
export default Room;
