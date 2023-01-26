import axios, { AxiosError, AxiosResponse } from "axios";
import { TCards } from "~/types/hearthstone";

const api = "https://omgvamp-hearthstone-v1.p.rapidapi.com/";

const headers = {
  "X-RapidAPI-Key": "369b7c995bmshf58cb097fae3a45p1733cdjsn4dfd16bacda6",
  "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
};

export const getCardsAPI = (url = "", params = {}): Promise<TCards> =>
  axios
    .get(`${api}cards/${url}`, { headers, params })
    .then(({ data }: AxiosResponse) => data)
    .catch((error: AxiosError) => {
      console.error(`${error} in [api/hearthstone/index.ts:getCardsAPI]`);
      throw new Error(error.message);
    });
