export class Player {
    private _username: string;
    private _id: number;
    // private _webSocket: WebSocket;

    constructor (userID: number, username: string/* , webSocket: WebSocket */) {
        this._id = userID;
        this._username = username;
    }

    // GETTERS
    getID(): number {
        return this._id;
    }

    getUsername(): string {
        return this._username;
    }
}