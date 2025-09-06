import {
  Application,
  Assets,
  Container,
  Graphics,
  Sprite,
  Text,
} from 'pixi.js';
import { Card } from './sprites/card.js';
import './ws.js';
import './GameState.js'

(async () => {
  const app = new Application();
  await app.init({ background: '#109900', resizeTo: window }); // init

  document.body.appendChild(app.canvas);

  const container = new Container();

  app.stage.addChild(container);

  const aceCard = new Card(
    'hearts',
    'A',
    600,
    300,
    0.5,
    Math.PI / 4,
    0.2,
    'assets/cards/ace.png',
  );
  aceCard.isActive = true;
  await aceCard.createSprite(container);
})();
