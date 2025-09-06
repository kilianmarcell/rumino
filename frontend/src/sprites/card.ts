import { Application, Assets, Container, Sprite } from 'pixi.js';
type Suit = 'diamonds' | 'clubs' | 'hearts' | 'spades';
type Rank =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'D'
  | 'K';

export class Card {
  suit: Suit;
  rank: Rank;

  // x and y positions of the card
  x: number;
  y: number;
  anchor: number;
  rotation: number;
  scale: number;

  imageSrc: string;
  imageSrcBack = './assets/cards/backface.png';
  currentImageSrc: string;
  texture?: any;
  sprite?: Sprite;
  container?: Container;

  isActive = false;
  faceIsUp = true;

  constructor(
    suit: Suit,
    rank: Rank,
    x: number,
    y: number,
    anchor: number,
    rotation: number,
    scale: number,
    imageSrc: string,
  ) {
    this.suit = suit;
    this.rank = rank;

    this.x = x;
    this.y = y;
    this.anchor = anchor;
    this.rotation = rotation;
    this.scale = scale;

    this.imageSrc = imageSrc;
    this.currentImageSrc = imageSrc;
  }

  /**
   * Creates the card's sprite
   * Adds the sprite to the chosen container
   */
  public async createSprite(container: Container) {
    try {
      this.texture = await Assets.load(this.currentImageSrc);

      this.sprite = new Sprite(this.texture);

      this.sprite.position.set(this.x, this.y);
      this.sprite.anchor.set(this.anchor);
      this.sprite.scale.set(this.scale);
      this.sprite.rotation = this.rotation;
      if (this.isActive) {
        this.container = container;
        container.addChild(this.sprite);
        this.sprite.interactive = true;
        this.sprite.cursor = 'pointer';
        this.sprite.on('pointertap', () => this.flipCard());
      }
    } catch (error) {
      console.error(
        `Failed to load asset or create sprite for card ${this.rank} of ${this.suit}:`,
        error,
      );
    }
  }

  public removeSprite() {
    if (this.isActive) {
      try {
        this.isActive = false;
        this.container!.removeChild(this.sprite!);
        this.sprite?.destroy();
      } catch (error) {
        console.error(
          `Failed to destroy card's sprite ${this.rank} of ${this.suit}:`,
          error,
        );
      }
    }
  }

  public flipCard() {
    this.faceIsUp = !this.faceIsUp;
    this.currentImageSrc =
      this.currentImageSrc != this.imageSrc ? this.imageSrc : this.imageSrcBack;

    this.createSprite(this.container!);
  }
}
