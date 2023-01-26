import { defineStore } from "pinia";
import { getCardsAPI } from "~/api/hearthstone";
import { AxiosError } from "axios";
import { reactive } from "vue";
import { ICards } from "~/store/hearthstone/types";
import { getRandomElements } from "~/helpers/random";

export const useHearthstone = defineStore("hearthstone", () => {
  const cards = reactive<ICards>({
    data: [],
    my: [],
    enemy: {},
    error: "",
    loading: false,
  });

  const getCards = (url: string): Promise<void[]> => {
    cards.loading = true;
    cards.error = "";

    const getEnemy = getCardsAPI(url, { health: "30" })
      .then((data) => {
        cards.enemy = { ...getRandomElements(data)[0], currentHp: 30 };
      })
      .catch(({ message }: AxiosError) => {
        cards.error = message;
      });

    const getCards = getCardsAPI(url)
      .then((data) => {
        const minions = data.filter(
          (card) => card.type === "Minion" && card.img
        );
        cards.data = minions;
        cards.my = getRandomElements(minions, 3);
      })
      .catch(({ message }: AxiosError) => {
        cards.error = message;
      });

    return Promise.all([getEnemy, getCards]).finally(() => {
      cards.loading = false;
    });
  };

  return {
    cards,
    getCards,
  };
});
