import { Room } from "./Room";
import { Player } from "./Player";

export class Rooms extends Map<number, Room> {
    private _ids: number = 0;

    constructor () {
        super();
    }

    public createRoom(creator: Player): Room {
        this._ids++;
        const room: Room = new Room(this._ids, creator);
        this.set(this.size + 1, room);
        return room;
    }
    
    public joinRoom(player: Player): Room {
        for (const [, room] of this.entries()) {
            if (room.addPlayer(player))
                return room;
        }
        return this.createRoom(player);
    }

    public leaveRoom(player: Player, roomID?: number): boolean {
        if (roomID !== undefined) {
            const room = this.get(roomID);
            if (room && room.removePlayer(player))
                return true;
            return false;
        }
        else {
            let removed: boolean = false;
            for (const [, room] of this.entries()) {
                if (room.removePlayer(player))
                    removed = true;
            }
            return removed;
        }
    }

    // GETTERS
    public getRoom(roomID: number): Room | undefined {
        return this.get(roomID);
    }
}