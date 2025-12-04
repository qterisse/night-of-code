import { Room } from "./Room";
import { Player } from "./Player";

export class Rooms extends Map<number, Room> {
    private _ids: number = 0;

    constructor () {
        super();
    }

    public createRoom(creator: Player): void {
        this._ids++;
        const room: Room = new Room(this._ids, creator);
        this.set(this.size + 1, room);
    }
    
    public joinRoom(player: Player): void /* boolean */ {
        for (const [, room] of this.entries()) {
            if (room.addPlayer(player))
                return /* true */;
        }
        this.createRoom(player);
    }

    public leaveRoom(player: Player, roomID: number): boolean {
        const room = this.get(roomID);

        if (room && room.removePlayer(player))
            return true;
        return false;
    }

    // GETTERS
    public getRoom(roomID: number): Room | undefined {
        return this.get(roomID);
    }
}