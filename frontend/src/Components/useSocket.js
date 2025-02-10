import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000"; 

let socketInstance = null; // 🔥 Singleton socket instance

const useSocket = (userId) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!userId) return;

        if (!socketInstance) {
            socketInstance = io(SOCKET_SERVER_URL, {
                query: { userId },
                withCredentials: true,
            });

            console.log("Socket Connected:", socketInstance.id);
        }

        setSocket(socketInstance);

        return () => {
            // Do not disconnect here to keep socket persistent
        };
    }, [userId]);

    return socket;
};

export default useSocket;
