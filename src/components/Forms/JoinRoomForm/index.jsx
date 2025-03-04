import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
      e.preventDefault();

      const roomData = {
        name , 
        roomId,
        userId: uuidv4(),
        host: false,
        presenter: false,
      };
      setUser(roomData);
      navigate(`/${roomId}`);
      socket.emit("userJoined" , roomData)
  }
  return (
    <form className="form mt-5 col-md-12">
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
        />
      </div>
      <div className="form-group  ">
        <input
          type="text"
          className="form-control my-2 "
          placeholder="Enter Room Code"
          value={roomId}
          onChange={(e)=> setRoomId(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleRoomJoin} className="mt-4 btn-primary btn-block form-control">
        Join Room
      </button>
    </form>
  );
};
export default JoinRoomForm;
