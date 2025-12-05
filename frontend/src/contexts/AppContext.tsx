// AppContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Room } from "../types/Room";
import { socket } from "../services/socket";
import type { Player } from "../types/Player";
import type { Card } from "../types/Card";
import { cards } from "../data/cards";

type AppContextValue = {
  playerId: number | null;
  setPlayerId: (id: number | null) => void;
  room: Room | null;
  setRoom: (room: Room | null) => void;
	playedCards: Card[];
	setPlayedCards: (card: Card[]) => void;
	selectedCardID: number | null;
	setSelectedCardID: (id: number | null) => void;
};

type PlayedCardPayload = {
  playerId: number;
  cardId: number;
  success: boolean;
};


const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCardID, setSelectedCardID] = useState<number | null>(null);
	const [playedCards, setPlayedCards] = useState<Card[]>([]);
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

	const handleRoomData = (data: any) => {
		console.log("Joined room data.playerId:", data.playerId);

		console.log("playerssss:", data.players);

		data.room._players = data.players;

		if (data.playerId)
			setPlayerId(data.playerId);
		setRoom(data.room);
	}

	const applyPlayedCardToRoom = (room: Room, data: PlayedCardPayload): Room => {
		if (!data.success) return room;

		return {
			...room,
			_players: room._players.map(player => {
				if (player._id !== data.playerId) return player; // use _id if that's your field

				return {
					...player,
					_hand: player._hand.filter(cardId => cardId !== data.cardId), // use your hand field
				};
			}),
			_playedCards: [...room._playedCards, data.cardId], // optional but usually desired
		};
	};

	useEffect(() => {
		console.log("CONNECTING SOCKET");
		socket.on("connect", () => {
			console.log("Connecté au serveur socket, id:", socket.id);
		});

		socket.on("joined-room", (data: {
			message: string,
			playerId: number,
      room: Room,
      players: Player[]
		}) => {
			handleRoomData(data);
		});

		socket.on("room-update", (data: any) => {
			handleRoomData(data);
		});

		socket.on("error", (data) => {
			console.log("ERROR:", data.message)
		});

		socket.on("played-card", (data: {playerId: number, cardId: number, success: boolean}) => {
			if (data.success) {
				const card = cards.find(card => card.id === data.cardId);
				if (!card) return ;
				setPlayedCards(c => ([...c, card]));
				setSelectedCardID(null);
				setRoom(prevRoom => prevRoom && applyPlayedCardToRoom(prevRoom, data));
			}
		})


		// return () => {
		// 	console.log("disconnecingidgns")
    //   socket.disconnect();
    // };
	}, [])


  const value: AppContextValue = {
    playerId,
    setPlayerId,
    room,
    setRoom,
		playedCards, setPlayedCards,
		selectedCardID, setSelectedCardID
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}