import { Card } from './card.js';

export class Player {
  id: number;
  name: string;
  hand: Card[];
  finished: boolean;

  constructor(id: number = 0, name: string) {
    this.id = id;
    this.name = name;
    this.hand = [];
    this.finished = false;
  }

  add_card(card: Card): void {
    this.hand.push(card);
  }

  discard_card(card: Card): void {
    this.hand.splice(this.hand.indexOf(card), 1);
    //TODO: add card to discardPile
  }

  get_hand(): Card[] {
    return this.hand;
  }

  make_meld(cards: Card[]): void {}

  player_win(): void {
    this.finished = true;
  }
}
