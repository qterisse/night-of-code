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
  players.set(socket.id, new Player(playerIDs, ''));
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
      socket.emit('error', {
        message: "Vous ne pouvez pas rejoindre de nouvelle partie",
        success: false
      });
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
      players: Array.from(room.getPlayers().values())
    });

    // On peut aussi prévenir tous les joueurs de la même room
    io.to(roomName).emit('room-update', {
      room,
      players: Array.from(room.getPlayers().values())
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

    if (Number.isNaN(data.cardID)) {
      socket.emit('error', {
        message: "Requête incorrecte",
        success: false
      });
      return;
    }

    if (!player.playCard(data.cardID)) {
      socket.emit('error', {
        message: "Impossible de jouer la carte",
        success: false
      });
      return;
    }

    // TODO: Envoyer l'info aux autres joueurs
    const room = player.getRoom();
    if (!room) {
      console.error('[ERROR]: how tf the player could play but is not in a game??');
      return;
    }
    io.to(`room-${player.getRoom()?.getRoomID()}`).emit('played-card', {
			playerId: player.getID(),
      cardId: data.cardID,
      success: true
    })
  });

  socket.on('start', () => {
    const player = players.get(socket.id);
    if (!player) {
	  	socket.emit('error', {
      	message: "Vous n'existez pas !",
        success: false
      });
      // TODO: Renvoyer une erreur
      return;
    }

    const room = player.getRoom();
    if (!room) {
      socket.emit('error', {
        message: "Vous n'êtes pas dans une partie",
        success: false
      });
      return;
    }

    if (room.getNumberOfPlayers() < 2) {
      socket.emit('error', {
        message: "Pas assez de joueurs",
        success: false
      });
      return;
    }
    if (room.getState() !== "waiting") {
      socket.emit('error', {
        message: "Partie déjà commencée",
        success: false
      })
      return;
    }
    room.changeState("round_1");

    io.to(`room-${room.getRoomID()}`).emit('start-game', {
      success: true,
      players: Array.from(room.getPlayers().values())
    });
  });

  socket.on('get-id', () => {
    const player = players.get(socket.id);
    if (!player) {
      socket.emit('error', {
        message: "Je ne te connais pas",
        success: false
      });
      return;
    }

    const room = player.getRoom();
    if (!room) {
      socket.emit('error', {
        message: "Vous n'êtes pas dans une partie",
        success: false
      });
      return;
    }

    const id = room.getPlayerID(player);
    if (id < 0) {
      socket.emit('error', {
        message: "Erreur dans la récupération de l'id",
        success: false
      });
      return;
    }

    socket.emit('id', id);
  });

  socket.on('leave-room', () => {
    const player = players.get(socket.id);
    if (player)
      rooms.leaveRoom(player);
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

