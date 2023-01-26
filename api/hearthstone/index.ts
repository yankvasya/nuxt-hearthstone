import axios, { AxiosError, AxiosResponse } from "axios";
import { TCards } from "~/types/hearthstone";

const api = "https://omgvamp-hearthstone-v1.p.rapidapi.com/";

const getHeaders = () => {
  const config = useRuntimeConfig();

  return {
    "X-RapidAPI-Key": config.public.HEARTH_TOKEN,
    "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
  };
};

export const getCardsAPI = (url = "", params = {}): Promise<TCards> => {
  const headers = getHeaders();

  return axios
    .get(`${api}cards/${url}`, { headers, params })
    .then(({ data }: AxiosResponse) => data)
    .catch((error: AxiosError) => {
      console.error(`${error} in [api/hearthstone/index.ts:getCardsAPI]`);
      throw new Error(error.message);
    });
};
