import { Player } from "./Player";

export class Room {
    private _roomID: number;
    private _players: Map<number, Player> = new Map<number, Player>();
    private _state: "waiting" | "round_1" | "intermission" | "round_2" | "finished" = "waiting";
    private _playedCards: number[] = [0];

    constructor (id: number, creator: Player) {
        this._roomID = id;
        this._players.set(0, creator);
    }

    public addPlayer(player: Player): boolean {
        if (this._players.size < 5 && this._state === "waiting") {
            this._players.forEach((p) => {
                if (p === player)
                    return false;
            });
            if (!player.setRoom(this))
                return false;
            this._players.set(this._players.size, player);
            if (this._players.size === 4)
                this.changeState("round_1");
            console.log(`Player ${player.getUsername()} joined the room ${this._roomID}`);
            console.log('Current players:', this._players);
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
            const playerToDelete = this._players.get(idToDelete);
            let cards: number[] = [];
            if (playerToDelete)
                cards = playerToDelete.getHand();
            this._players.delete(idToDelete);
            console.log(`Player ${player.getUsername()} left the room ${this._roomID}`);
            this.resetPlayersMapKeys();
            for (let i = 0; i < cards.length; i++) {
                this._players.get(i % this._players.size)?.addCardToHand(cards[i]);
            }
            return true;
        }
        else
            return false;
    }

    public playCard(cardID: number): void {
        this._playedCards.push(cardID);

        if (this._state === "round_1" && this._playedCards.length === 12)
            this.changeState("intermission");
    }

    private shuffleCards(numberOfCards: number): boolean {
        let cards: number[] = [];

        for (let i = 0; i < numberOfCards; i++)
            cards[i] = i + 1;

        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        
        for (let i = 0; i < cards.length; i++) {
            const player = this._players.get(i % this._players.size);

            if (player)
                player.addCardToHand(cards[i]);
            else
                return false;
        }
        return true;
    }

    private resetPlayersMapKeys(resetHands: boolean = false): void {
        const newMap: Map<number, Player> = new Map<number, Player>();
        let index = 0;

        this._players.forEach((player) => {
            newMap.set(index, player);
            index++;
            if (resetHands)
                player.resetHand();
        });
    }

    // SETTERS
    public changeState(state: typeof this._state): void {
        if (state === this._state)
            return;

        this._state = state;
        switch (this._state) {
            case ("round_1"): {
                let i = 0;
                while (!this.shuffleCards(10) && i < 5) {
                    console.error('[ERROR]: shuffleCards failed');
                    this.resetPlayersMapKeys(true);
                    i++;
                }
                if (i >= 5)
                    console.error('[ERROR]: could not shuffle cards');
                break;
            }
            case ("intermission"): {
                // TODO: trouver quoi faire
                break;
            }
            case ("round_2"): {
                let i = 0;
                while (!this.shuffleCards(10) && i < 5) {
                    console.error('[ERROR]: shuffleCards failed');
                    this.resetPlayersMapKeys(true);
                    i++;
                }
                if (i >= 5)
                    console.error('[ERROR]: could not shuffle cards');
                break;
            }
            case ("finished"): {
                // TODO: trouver quoi faire
                break;
            }
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

    public getPlayerID(player: Player): number {
        this._players.forEach((p, id) => {
            if (p === player)
                return id;
        });
        return -1;
    }
}