import express from 'express';
import cors from 'cors';
import { Socket, Server } from 'socket.io';
import { createServer } from 'http';
import { Player } from './Player';
import { Rooms } from './Rooms';

interface UsernameData {
  username: string;
}

interface CardData {
  cardID: number;
}

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

  socket.on('join-room', (data: UsernameData) => {

	  console.log("username: ", data.username);
    const player = players.get(socket.id);

    if (!player) {
      console.error('[ERROR]: unknown player, id:', socket.id);
      return;
    }

    player.setUsername(data.username);
    const room = rooms.joinRoom(player);
    if (!room) {
      console.error('[ERROR]: could not set room for player');
      // TODO: Renvoyer une erreur
      return;
    }

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

  socket.on('play-card', (data: CardData) => {
    const player = players.get(socket.id);
    if (!player) {
      // TODO: Renvoyer une erreur
      return;
    }

    if (!player.playCard(data.cardID)) {
      // TODO: Renvoyer une erreur
      return;
    }

    // TODO: Envoyer l'info aux autres joueurs
  });

  socket.on('start', () => {
    const player = players.get(socket.id);
    if (!player) {
      // TODO: Renvoyer une erreur
      return;
    }

    const room = player.getRoom();
    if (!room) {
      // TODO: Renvoyer une erreur
      return;
    }

    if (room.getNumberOfPlayers() < 2) {
      // TODO: Renvoyer une erreur (pas assez de joueurs)
      return;
    }
    if (room.getState() !== "waiting") {
      // TODO: Renvoyer une erreur (partie déjà commencée)
      return;
    }
    room.changeState("in_progress");

    // TODO: envoyer update aux joueurs de la room
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

