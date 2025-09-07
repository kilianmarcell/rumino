import {
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  Text,
} from 'pixi.js';
import { Card } from './sprites/card.js';
import type { GameState } from './ws.js';


function displayGameState (gameState : GameState, appWindow : Container) {

  // very important
  const WIDTH = appWindow.width;
  const HEIGHT = appWindow.height;

  // creating containers for all main regions of the board
  const otherPlayersUpperContainer = new Container();
  appWindow.addChild(otherPlayersUpperContainer)
  otherPlayersUpperContainer.x = 20
  otherPlayersUpperContainer.y = 20

  const otherPlayersSideContainer = new Container();
  appWindow.addChild(otherPlayersUpperContainer)

  const tableContainer = new Container();
  appWindow.addChild(tableContainer)

  const thisPlayerContainer = new Container();
  appWindow.addChild(thisPlayerContainer)

  const twoPilesContainer = new Container();
  appWindow.addChild(twoPilesContainer)
  
  let nPlayers = gameState.players.size;
  
  let otherPlayers = [];
  let otherPlayerCardPositions = []; // the middle of the card stack of a player

  let cardPosition = 0; // this player's card position

  // Arrange the players in two sets: this player & others
  for (const [key, value] of gameState.players) {
    if (key == gameState.currentPlayerId) {
      let thisPlayer = { key: key, value: value };
    } else {
      otherPlayers.push({ key: key, value: value });
    }
  }

  switch (nPlayers) {
    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;
    case 6:
      break;

    default:
      //error
  }

  

  

}
