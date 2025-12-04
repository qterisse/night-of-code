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

socket.on("joined-room", (data: room) => {
  console.log("Joined room:", data);
});

socket.on("room-update", (data: room) => {
  console.log("Room update:", data);
});
