import { WebSocketServer } from 'ws';
import express from 'express';
import type { Card } from './game/card.js';
import { Game } from './game/game.js';
import type { Player } from './game/player.js';
const app = express();
const PORT = 3000;

// Serve static files (optional, for client)
express.static('../frontend/assets');

const server = app.listen(PORT, () => {
  console.log(`HTTP server listening on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });


export type GameState = {
  currentPlayerId: string,
  discardPileTop: BasicCard,
  hand: BasicCard[],
  melds: Meld[]
  players: Map<string, PlayerData>
}

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
  name?: string,
  player?: Player
  ws: WebSocket
}
type OpponentData = {
  id: string
  name: string
  nCards: number
}


const players: Map<string, PlayerData> = new Map()
let gameState: GameState | null = null;

wss.on('connection', (ws: any) => {
  const playerId = crypto.randomUUID();
  const player: PlayerData = { playerId, };

  players.set(playerId, player);

  console.log(`Player connected: ${playerId}`);
  ws.send(JSON.stringify({ type: 'welcome', playerId }));

  ws.on('message', (message: string) => {
    try {
      const data = JSON.parse(message.toString());
      handleMessage(player, data);
    } catch (err) {
      console.error('Invalid message', err);
    }
  });

  ws.on('close', () => {
    players.delete(playerId);
    broadcast({ type: 'player-left', playerId });
  });
});



function handleMessage(player: Player, data: any) {
  switch (data.type) {
    case 'set-name':
      player.name = data.name;

      break;
    case 'toggle-ready':
      player.ready = !player.ready
      const nReady = Object.values(players).filter(p => p.ready).length;
      if (nReady > 2 && nReady == players.size)
        gameState = initGame()
      break

    case 'draw':
      break

    case 'end_turn':
      break


    default:
      console.log('Unknown message type', data);
  }
}

function broadcast(message: any) {
  const json = JSON.stringify(message);
  for (const player of players.values()) {
    player.ws.send(json);
  }
}


function sendState() {
  for (const player of players.values()) {
    const data = {
      players.
    } as GameState
    player.ws.send(JSON.stringify(data));

  }
}


function initGame(players: Map<string, Player>) {
  const game = new Game(players.values().toArray())
}