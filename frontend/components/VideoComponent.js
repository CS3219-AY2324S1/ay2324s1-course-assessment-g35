import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

let socket;

export default function VideoComponent() {
  const [myId, setMyId] = useState(""); //socketid
  const [userId, setUserId] = useState(""); //target userId
  const [stream, setStream] = useState(); //videostream
  const [receivingCall, setReceivingCall] = useState(false); //to set the reciving call UI
  const [caller, setCaller] = useState(""); //caller socketId
  const [callerSignal, setCallerSignal] = useState(); //caller signal
  const [inCall, setInCall] = useState(false);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const router = useRouter();
  const { roomId } = router.query; // Extracting roomId from the URL
  const [canCall, setCanCall] = useState(false);
  useEffect(() => {
    socket = io("http://localhost:3002");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      });
    exchangeId();
    socket.on("callUser", (data) => {
      //when it receives call from another user, set the name, callerSignal, caller. setReceivingCall to true
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal); //it will receive caller signal, caller name and socketId
    });
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [roomId]); //myVideo.current -->dk if need to // userId, myId

  const exchangeId = () => {
    socket.on("connect", () => {
      socket.emit("join_room", roomId);
    });
    socket.on("me", (id) => {
      //retrieve current socketId from server
      setMyId(id);
      socket.on("receive_id", (userId) => {
        //retrieve current socketId from server
        setUserId(userId);
        setCanCall(true);
      });
      const data = {
        id: id,
        roomId: roomId,
      };
      socket.emit("send_id", data);
    });
  };

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      //exchange of signaling data between peers to establish a connection.
      socket.emit("callUser", {
        //emit callUser to server, which will emit callUser to the other peer. This will setReceivingCall to true, causing a notification to be sent to the other user
        userToCall: id,
        signalData: data,
        from: myId, //my own socketId
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      //after the other peer click on answerCall, which will emit an answerCall event, which will emit a callAccepted event to here.
      setInCall(true);
      peer.signal(signal); //call when the remote peer calls a peer.on("signal")
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setInCall(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-3 tracking-wide mt-6">
            Video chat your friend
          </h1>
          <div className="mb-4 h-full">
            <video playsInline muted ref={myVideo} autoPlay />
          </div>
          <div className="mb-4 h-full">
            {inCall ? <video playsInline ref={userVideo} autoPlay /> : null}
          </div>
          {canCall && !inCall ? (
            <Button
              color="primary"
              aria-label="call"
              onClick={() => callUser(userId)}
            >
              Call
            </Button>
          ) : null}
        </div>

        <div className="flex flex-col items-center">
          {!inCall && receivingCall ? (
            <div className="">
              <h1>{caller} is calling...</h1>
              <Button variant="contained" color="primary" onClick={answerCall}>
                Answer
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
