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

type AppContextValue = {
  playerId: number | null;
  setPlayerId: (id: number | null) => void;
  room: Room | null;
  setRoom: (room: Room | null) => void;
};

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

	const handleRoomData = (data: any) => {
		console.log("Joined room data.playerId:", data.playerId);

		console.log("playerssss:", data.players);

		data.room._players = data.players;

		setPlayerId(data.playerId);
		setRoom(data.room);
	}

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