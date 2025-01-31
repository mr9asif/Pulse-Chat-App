import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../Utils/AuthContext";

export const SocketContext = createContext();



export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { user } = useContext(UserContext);
	
	


	useEffect(() => {
		if (user) {
			console.log("user id", user.id)
			const socket = io("http://localhost:4000", {
				query: {
					userId: user._id,
				},
			});

			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("onlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [user]);

	return <SocketContext.Provider value={{ socket, onlineUsers ,user, }}>{children}</SocketContext.Provider>;
};