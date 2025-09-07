import type { Card as CardSprite } from "./sprites/card.js";

const URL = 'localhost:3000';

const ws = new WebSocket(`ws://${URL}`);

let playerId: string;
let gameState: GameState; // current game state from server

ws.onopen = () => console.log('Connected to server');

ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    handleServerMessage(data);
};

type BasicCard = {
    rank: string,
    suite: string,
}

type Position = {
    x: number,
    y: number,
    rotation: number
}

type Meld = {
    cards: (BasicCard & Position)[]
}

type PlayerData = {
    id: string,
    name: string,
    nCards: number,
}

export type GameState = {
    currentPlayerId: string,
    discardPileTop: BasicCard,
    hand: BasicCard[],
    melds: Meld[]
    players: Map<string, PlayerData> // id --> player
}

function handleServerMessage(data: any) {
    switch (data.type) {
        case 'welcome':
            playerId = data.playerId;
            break;
        case 'player-joined':
            console.log(`${data.name} joined the game`);
            break;
        case 'game-state':
            gameState = data.state;
            console.log('game state changed ');
            break;
        default:
            console.log('Unknown message', data);
    }
}
