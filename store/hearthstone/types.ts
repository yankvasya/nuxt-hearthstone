import { TCard, TCards } from "~/types/hearthstone";

export interface ICards {
  data: TCards;
  my: TCards;
  enemy: TCard;
  error: string;
  loading: boolean;
}
