import { Player } from "./Player";

export class Room {
    private _roomID: number;
    private _players: Map<number, Player> = new Map<number, Player>();
    private _state: "waiting" | "round_1" | "intermission" | "round_2" | "finished" = "waiting";
    private _playedCards: number[] = [];

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
            if (!player.setRoom(this))
                return false;
            this._players.set(this._players.size + 1, player);
            if (this._players.size === 4)
                this.changeState("round_1");
            console.log(`Player ${player.getUsername()} joined the room ${this._roomID}`);
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
            console.log(`Player ${player.getUsername()} left the room ${this._roomID}`);
            // TODO: redistribuer ses cartes entre les autres joueurs
            return true;
        }
        else
            return false;
    }

    public playCard(cardID: number): void {
        this._playedCards.push(cardID);

        if (this._playedCards.length === 12)
            this.changeState("intermission");
    }

    private shuffleCards(): void {
        let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        console.log('Shuffled cards:', cards);
    }

    // SETTERS
    public changeState(state: typeof this._state): void {
        if (state === this._state)
            return;

        this._state = state;
        if (this._state === "round_1") {
            this.shuffleCards();
        }
    }

    // GETTERS
    public getRoomID(): number {
        return this._roomID;
    }

    public getState(): typeof this._state {
        return this._state;
    }

    public getPlayers(): Map<number, Player> {
        return this._players;
    }

    public getNumberOfPlayers(): number {
        return this._players.size;
    }
}