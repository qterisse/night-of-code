import type { Player } from "./Player";

export type Room = {
	_roomID: number;
	_players: Player[];
	_state: "waiting" | "in_progress" | "finished";
	_playedCards: number[];
};
