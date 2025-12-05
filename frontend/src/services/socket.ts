import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

export const socket = io("http://localhost:3001");

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
