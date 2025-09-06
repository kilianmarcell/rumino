import { buildDeck, Card, shuffle } from './card.js';
import { Player } from './player.js';

export class Game {
  deck: Card[]; //deck[0] is the card that is on top of the deck
  players: Player[];
  discardPile: Card[];
  currentPlayerIndex: number;

  constructor(players: Player[]) {
    if (players.length < 2) throw new Error('Not enough players');
    this.deck = [];
    this.players = players;
    this.discardPile = [];
    this.currentPlayerIndex = 0;
  }

  start_game(): void {
    const nDecks = 2;
    for (let i = 0; i < nDecks; i++) {
      this.deck = this.deck.concat(buildDeck());
      this.deck = shuffle(this.deck);
    }
    const numberOfCards = 52;
    this.players.forEach((player) => {
      const dealCardsNumber = 15; //TODO: calculate it
      for (let i = 0; i < dealCardsNumber; i++) {
        player.add_card(this.deck.pop()!);
      }
    });
  }

  next_turn(): void {
    this.currentPlayerIndex = ++this.currentPlayerIndex % this.players.length;
  }

  current_player(): Player {
    return this.players[this.currentPlayerIndex]!;
  }

  check_win(): void {
    const currentPlayer = this.players[this.currentPlayerIndex];
    if (currentPlayer?.get_hand().length == 0) currentPlayer?.player_win();
  }

  reshuffle_discard_pile(): void {
    const topCard = this.discardPile.pop();
    this.deck = shuffle(this.discardPile);
    this.discardPile.push(topCard!);
  }

  discard_card(card: Card): void {
    this.discardPile.push(card);
  }
}
