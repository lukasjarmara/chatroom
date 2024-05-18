import * as React from "react";
import { db } from "../../firebase";
import { ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

const Room: React.FC = () => {
  const { roomId } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const user = query.get("user");
  const [response, setResponse] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const navigate = useNavigate();
  console.log(user, roomId);

  React.useEffect(() => {
    if (user === "default") {
      console.log("default username");
      navigate(`/`);
    }
    console.log("reached");
    const resp = ref(db, `/1`);
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
