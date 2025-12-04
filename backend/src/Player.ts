import { Socket } from "socket.io";

export class Player {
    private _username: string;
    private _id: number;
    private _socket: Socket;

    constructor (userID: number, username: string, socket: Socket) {
        this._id = userID;
        this._username = username;
        this._socket = socket;
    }

    // SETTERS
    public setUsername(username: string): void {
        this._username = username;
    }

    // GETTERS
    public getID(): number {
        return this._id;
    }

    public getUsername(): string {
        return this._username;
    }

    public getSocket(): Socket {
        return this._socket;
    }
}