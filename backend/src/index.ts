import express from 'express';
import cors from 'cors';
import { Socket, Server } from 'socket.io';
import { createServer } from 'http';
import { join } from 'path';
import { Player } from './Player';
import { Rooms } from './Rooms';
import { Room } from './Room';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

// app.get('/api/hello', (req, res) => {
// 	console.log("hello log");
// 	res.json({ message: 'Hello from backenddd!' });
// });

// app.post('/api/join-room', (req, res) => {
// 	const { playerId, room } = joinRoom();

// 	res.json({
// 		message: 'Player joined room',
// 		playerId,
// 		room,
// 	});
// });



// interface Room {
//   id: number;
//   players: number[];
//   isOpen: boolean;
// }

// const rooms: Room[] = [];
const rooms = new Rooms();
const players: Map<string, Player> = new Map<string, Player>();
let playerIDs = 1;

// function joinRoom(): { playerId: number; room: Room } {

// 	let room: Room | undefined = rooms.find((room) => room.isOpen)

// 	if (room === undefined) {
// 		room = {
// 			id: rooms.length,
// 			players: [],
// 			isOpen: true,
// 		};

// 		rooms.push(room);
// 	}

// 	let newPlayerId = players.length;
// 	players.push(newPlayerId)

// 	room.players.push(newPlayerId);
// 	if (room.players.length >= 4) {
// 		room.isOpen = false;
// 	}

// 	console.log(rooms);
	

// 	return { playerId: newPlayerId, room };
// }


io.on('connection', (socket: Socket) => {
  console.log('Nouveau client connecté :', socket.id);
  players.set(socket.id, new Player(playerIDs, '', socket));
  playerIDs++;

  socket.on('join-room', () => {
    const player = players.get(socket.id);

    if (!player) {
      console.error('[ERROR]: unknown player, id:', socket.id);
      return;
    }
    const room = rooms.joinRoom(player);
    // const { playerId, room } = joinRoom();

    const roomName = `room-${room.getRoomID()}`;

    socket.join(roomName);

    const playerId = player.getID();
    // On envoie une réponse juste à ce joueur
    socket.emit('joined-room', {
      message: 'Player joined room (socket)',
      playerId,
      room,
    });

    // On peut aussi prévenir tous les joueurs de la même room
    io.to(roomName).emit('room-update', {
      room,
    });

    console.log(
      `Player ${playerId} joined room ${room.getRoomID()} (socket: ${socket.id})`
    );
  });

  socket.on('disconnect', () => {
    console.log('Client déconnecté :', socket.id);
    // Ici tu peux gérer la sortie du joueur de la room si besoin
    const player = players.get(socket.id);
    if (player)
      rooms.leaveRoom(player);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

