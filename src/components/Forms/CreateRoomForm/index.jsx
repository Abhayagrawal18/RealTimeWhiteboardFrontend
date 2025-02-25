import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 

const CreateRoomForm = ({socket , setUser}) => {
  const [roomId, setRoomId] = useState(uuidv4());
  const [name , setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom= (e) => {
     e.preventDefault();

    //  {name , roomId , userId , host , presenter}

    const roomData = {
      name , 
      roomId,
      userId: uuidv4(),
      host:true,
      presenter: true
    }
    setUser(roomData);
    navigate(`/${roomId}`)
    console.log(roomData)
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
      <div className="form-group border">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0"
            disabled
            placeholder="Generate The Room Code"
          />
          <div className="input-group-append ">
            <button
              className="btn btn-primary btn-sm me-1"
              onClick={() => setRoomId(uuidv4())} // Generate new UUID
              type="button"
            >
              Generate
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-1"
              type="button"
              onClick={() => navigator.clipboard.writeText(roomId)} // Copy to clipboard
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <button type="submit" onClick={handleCreateRoom} className="mt-4 btn-primary btn-block form-control">
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
