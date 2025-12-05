import { Socket } from "socket.io-client";
import type { Room } from "./Room";

export type Player = {
	// id: number,
	// name: string
	_username: string;
	_id: number;
	_socket: Socket;
	_hand: number[];
	_room: Room | null;
}

