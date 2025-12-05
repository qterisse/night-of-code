import { Room } from "./Room";
import { Player } from "./Player";

export class Rooms extends Map<number, Room> {
  private _ids: number = 1;

  constructor() {
    super();
  }

  public createRoom(creator: Player): Room | null {
    const room: Room = new Room(this._ids, creator);
    if (!creator.setRoom(room)) return null;
    this._ids++;
    this.set(this.size + 1, room);
    return room;
  }

  public joinRoom(player: Player): Room | null {
    for (const [, room] of this.entries()) {
      if (room.addPlayer(player)) return room;
      else return null;
    }
    return this.createRoom(player);
  }

  public leaveRoom(player: Player, roomID?: number): boolean {
    if (roomID !== undefined) {
      const room = this.get(roomID);
      if (room && room.removePlayer(player)) return true;
      return false;
    } else {
      let removed: boolean = false;
      for (const [, room] of this.entries()) {
        if (room.removePlayer(player)) removed = true;
      }
      return removed;
    }
  }

  // GETTERS
  public getRoom(roomID: number): Room | undefined {
    return this.get(roomID);
  }
}
