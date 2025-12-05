import { Room } from "./Room";

export class Player {
    private _username: string;
    private _id: number;
    private _hand: number[] = [];
    private _room: Room | null = null;

    constructor (userID: number, username: string) {
        this._id = userID;
        this._username = username;
    }

    public playCard(cardID: number): boolean {
        const index = this._hand.indexOf(cardID)
        if (index !== -1 && this._room && (this._room.getState() === "round_1" || this._room.getState() === "round_2")) {
            this._hand.splice(index, 1);
            this._room.playCard(cardID);
            return true;
        }
        else
            return false;
    }

    public addCardToHand(cardID: number): void {
        this._hand.push(cardID);
    }

    public resetHand(): void {
        this._hand = [];
    }

    // SETTERS
    public setUsername(username: string): void {
        this._username = username;
    }

    public setRoom(room: Room | null): boolean {
        if ((room && !this._room) || !room) {
            this._room = room;
            return true;
        }
        return false;
    }

    // GETTERS
    public getID(): number {
        return this._id;
    }

    public getUsername(): string {
        return this._username;
    }

    public getHand(): number[] {
        return this._hand;
    }

    public getRoom(): Room | null {
        return this._room;
    }
}