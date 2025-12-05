import { Socket } from "socket.io-client";
import type { Room } from "./Room";

export type Player = {
	_username: string;
	_id: number;
	_socket: Socket;
	_hand: number[];
	_room: Room | null;
}

