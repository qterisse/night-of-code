import { io } from 'socket.io-client';

export const socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("Connecté au serveur socket, id:", socket.id);
});

socket.on("joined-room", (data) => {
  console.log("Joined room:", data);
});

socket.on("room-update", (data) => {
  console.log("Room update:", data);
});
