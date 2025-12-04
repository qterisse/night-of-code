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

	useEffect(() => {
		console.log("CONNECTING SOCKET");
		socket.on("connect", () => {
			console.log("Connecté au serveur socket, id:", socket.id);
		});

		socket.on("joined-room", (data: Room) => {
			console.log("Joined room:", data);
			setRoom(data);
		});

		socket.on("room-update", (data: Room) => {
			console.log("Room update:", data);
			setRoom(data);
		});

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