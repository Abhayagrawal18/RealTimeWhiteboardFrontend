import {io} from "socket.io-client"
import Forms from "./components/Forms";
import './App.css'
import {  data, Route, Routes } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
// import { toast } from "react-toastify";
import RoomPage from "./pages/RoomPage";
import { useEffect, useState } from "react";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts : "Infinity",
  timeout: 10000,
  transports : ["websocket"],
};

const socket = io(server , connectionOptions)


const  App=()=>   {

  const [user , setUser] = useState(null);
  const [users , setUsers] = useState([]);

  useEffect(()=>{
    socket.on("userIsJoined" , (data)=> {
      if(data.success){
        console.log("userJoined");
        setUsers(data.users)
        
      } else {
        console.log("userJoined error");
      }
    })
    socket.on("allUsers" , (data)=> {
      setUsers(data)
    })

    socket.on("userJoinedMessageBroadcasted" , (data)=> {
      console.log(`${data} joined the Room`)
      toast.info(`${data} joined the Room`)
    })
    socket.on("userLeftMessageBroadcasted" , (data)=> {
      console.log(`${data} left the room`);
      toast.info(`${data} left the room`)
    })
  },[])

  const uuid = ()=> {
    let S4 = ()=> {
      return (((1 + Math.random()) * 0*10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  }
  return (
    <>
      <div className='container'>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser}/>}/>
          <Route path="/:roomId" element={<RoomPage user={user} socket={socket} users={users}/>}/>
       
        </Routes>
      
      </div>
    </>
  )
}

export default App
