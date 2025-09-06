import { WebSocketServer } from 'ws';
import express from 'express';
import type { Card } from './game/card.js';

const app = express();
const PORT = 3000;

// Serve static files (optional, for client)
app.use(express.static('public'));

const server = app.listen(PORT, () => {
  console.log(`HTTP server listening on http://localhost:${PORT}`);
});

const wss = new WebSocketServer({ server });

interface Player {
  id: string;
  ws: WebSocket;
  name?: string;
}

const players: Map<string, Player> = new Map();

wss.on('connection', (ws: any) => {
  const playerId = crypto.randomUUID();
  const player: Player = { id: playerId, ws };
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
      broadcast({
        type: 'player-joined',
        playerId: player.id,
        name: player.name,
      });
      break;

    case 'draw':
      break

    case 'change_board':
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
