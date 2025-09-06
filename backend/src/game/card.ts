export const suits = ['diamonds', 'clubs', 'hearts', 'spades'] as const;
export type Suit = (typeof suits)[number];

export const ranks = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'D',
  'K',
] as const;
export type Rank = (typeof ranks)[number];

export class Card {
  constructor(
    public suit: Suit,
    public rank: Rank,
  ) {}
}
export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex]!,
      array[currentIndex]!,
    ];
  }

  return array;
}

export function buildDeck(): Card[] {
  return suits.flatMap((suit) => ranks.map((rank) => new Card(suit, rank)));
}
