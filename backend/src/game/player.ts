import { Card } from './card.js';

export class Player {
  hand: Card[];
  finished: boolean;

  constructor(name: string) {
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
