export type TCard = {
  cardId: string;
  dbfId: number;
  name: string;
  cardSet: string;
  type: string;
  health: 45;
  playerClass: string;
  img: string;
  locale: string;
  currentHp?: number;
};

export type TCards = TCard[];
