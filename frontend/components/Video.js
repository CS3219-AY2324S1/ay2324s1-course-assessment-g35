import React, { useEffect, useRef, useState } from "react";

export default function Video({myId, otherId}) {

  const myVideo = useRef();
  const userVideo = useRef();
  const stream = useRef();

    const [isPeerOpen, setIsPeerOpen] = useState(false);
    const [isStreamReady, setIsStreamReady] = useState(false);
    const peerInstance = useRef(null);

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
        const Peer = require('peerjs').default; // Import PeerJS here

        console.log('myId', myId);
        console.log('otherId', otherId);
  
        const myPeer = new Peer(myId, {
            host: '/',
            port: '4001',
        }); // where peerjs server is hosted 

        myPeer.on('open', id => {
            console.log('myPeer id', id);
            setIsPeerOpen(true);
        });
        myPeer.on('error', (err) => {
            console.log('error', err);
        });
        console.log('errorlistener added');

        peerInstance.current = myPeer;

    } else {
        console.log('window is undefined');
    }

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        stream.current = stream;
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }

        setIsStreamReady(true);

        console.log('myPeer', myPeer);

        peerInstance.on('call', call => {
            // if no prior connection with other user
            // if (myPeer.connections[call.peer].length === 0) { //edit this please
                call.answer(stream.current)
                console.log('call.answer');
                call.on('stream', userVideoStream => {
                    userVideo.current.srcObject = userVideoStream
                })
                call.on('close', () => {
                    userVideo.current.srcObject = null
                })
            // }
        });
      });

    return () => {
        if (myPeer) {
            myPeer.destroy();
        }
    };
  }, [myId, otherId]); //myVideo.current -->dk if need to // userId, myId

  useEffect(() => {
    if (myPeer && isPeerOpen && isStreamReady) {
        console.log('myPeer before calling', myPeer);
        var call = myPeer.call(otherId, stream.current)
        if (call) {
            call.on('stream', userVideoStream => {
              userVideo.current.srcObject = userVideoStream;
            });
      
            call.on('close', () => {
              userVideo.current.srcObject = null;
            });
            console.log('Call object is defined.');
          } else {
            console.log('Call object is not defined.');
          }
    } else {
        console.log('not ready');
        console.log('myPeer', myPeer);
        console.log('isPeerOpen', isPeerOpen);
        console.log('isStreamReady', isStreamReady);
    };
    }, [myPeer, isPeerOpen, isStreamReady]);

  return (
    <>
      <div className="w-full h-full">
        <div className="flex flex-col items-center">
            {/* myId: {myId} */}
            <br />
            {/* otherId: {otherId} */}
          <h1 className="text-2xl font-bold mb-3 tracking-wide mt-6">
            Video chat your friend
          </h1>
          <div className="mb-4 h-full">
            <video playsInline muted ref={myVideo} autoPlay />
          </div>
          <div className="mb-4 h-full">
            <video playsInline ref={userVideo} autoPlay />
          </div>
        </div>
      </div>
    </>
  );
}
