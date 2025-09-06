const URL = 'localhost:3000'

const ws = new WebSocket(`ws://${URL}`);

let playerId: string;
let gameState: any = {}; // current game state from server

ws.onopen = () => console.log('Connected to server');

ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    handleServerMessage(data);
};


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
            console.log("game state changed ")
            break;
        default:
            console.log('Unknown message', data);
    }
}
