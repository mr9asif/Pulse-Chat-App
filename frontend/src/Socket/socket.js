import { io } from "socket.io-client";

// Socket URL (adjust it to the correct backend URL)
const SOCKET_URL = "http://localhost:4000";

const socket = io(SOCKET_URL, {
  withCredentials: true, // Ensure credentials are included if needed
});

// Event: Successfully connected
socket.on('connect', () => {
  console.log('Connected to backend via socket:', socket.id);
});

// Event: Custom 'welcome' message from server
socket.on('welcome', (message) => {
  console.log(message); // Should log "Hello from the server!"
});

// Event: Disconnected from the backend
socket.on('disconnect', () => {
  console.log('Disconnected from backend');
});

// Event: Connection error
socket.on('connect_error', (error) => {
  console.error('Socket.IO connection error:', error);
});

// Event: Connection timeout
socket.on('connect_timeout', () => {
  console.error('Socket.IO connection timeout');
});

// Event: General error
socket.on('error', (error) => {
  console.error('Socket.IO error:', error);
});

export default socket;
