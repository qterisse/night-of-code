import express from 'express';
import cors from 'cors';
import { Socket, Server } from 'socket.io';
import { createServer } from 'http';
import { Player } from './Player';
import { Rooms } from './Rooms';

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

const rooms = new Rooms();
const players: Map<string, Player> = new Map<string, Player>();
let playerIDs = 1;

io.on('connection', (socket: Socket) => {
  console.log('Nouveau client connecté :', socket.id);
  players.set(socket.id, new Player(playerIDs, '', socket));
  playerIDs++;

  socket.on('join-room', (username: string) => {

	  console.log("username: ", username);
    const player = players.get(socket.id);

    if (!player) {
      console.error('[ERROR]: unknown player, id:', socket.id);
      return;
    }

    player.setUsername(username);
    const room = rooms.joinRoom(player);

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

