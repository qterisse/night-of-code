import { Player } from "./Player";

export class Room {
    private _roomID: number;
    private _players: Map<number, Player> = new Map<number, Player>();
    private _state: "waiting" | "in_progress" | "finished" = "waiting";

    constructor (id: number, creator: Player) {
        this._roomID = id;
        this._players.set(1, creator);
    }

    public addPlayer(player: Player): boolean {
        if (this._players.size < 5 && this._state === "waiting") {
            this._players.forEach((p) => {
                if (p === player)
                    return false;
            });
            this._players.set(this._players.size + 1, player);
            return true;
        }
        return false;
    }

    public removePlayer(player: Player): boolean {
        let idToDelete: number | undefined = undefined;

        for (const [id, p] of this._players.entries()) {
            if (player === p) {
                idToDelete = id;
                break;
            }
        }

        if (idToDelete !== undefined) {
            this._players.delete(idToDelete);
            // TODO: redistribuer ses cartes entre les autres joueurs
            return true;
        }
        else
            return false;
    }

    // SETTERS
    public changeState(state: typeof this._state): void {
        if (state === this._state)
            return;

        this._state = state;
    }

    // GETTERS
    public getRoomID(): number {
        return this._roomID;
    }

    public getState(): typeof this._state {
        return this._state;
    }
}