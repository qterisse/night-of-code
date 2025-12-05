import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const getBackendUrl = (): string => {
    // In production, use the same protocol and construct backend URL
    if (import.meta.env.PROD) {
        // If frontend is on Heroku, backend is too
        // return window.location.origin. replace('frontend', 'backend');
        console.log('HERE');
        
        // Or hardcode production URL
        return 'https://night-of-code-backend-8f55fe094632.herokuapp.com';
    }
        return 'https://night-of-code-backend-8f55fe094632.herokuapp.com';
    
    // Development
    return 'http://localhost:3001';
};

export const socket = io(getBackendUrl());

socket.on("connect", () => {
  console.log("Connecté au serveur socket, id:", socket.id);
});

type room = {
  id: number;
  players: number[];
  isOpen: boolean;
};

socket.on("error", (data: {origin: string}) => {
  if (data.origin === "joinRoom")
    toast.error("Impossible de rejoindre une partie");
});

socket.on("joined-room", (data: room) => {
  const navigate = useNavigate();
  console.log("Joined room:", data);

  navigate("/lobby");
});

socket.on("room-update", (data: room) => {
  console.log("Room update:", data);
});
