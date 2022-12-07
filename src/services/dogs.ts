import axios from 'axios';

const BASE_URL = 'https://dog.ceo/api';

interface BaseResponse<T> {
  message: T;
  status: string;
}

export interface IBreed {
  [key: string]: string[];
}

export const getBreeds = async (): Promise<IBreed> => {
  const { data } = await axios.get<BaseResponse<IBreed>>(`${BASE_URL}/breeds/list/all`);
  return data.message;
};

export const getImagesByBreed = async (
  breedPartUrl: string,
  signal: AbortController['signal'],
): Promise<string[]> => {
  const { data } = await axios.get<BaseResponse<string[]>>(
    `${BASE_URL}/breed/${breedPartUrl}/images/random/3`,
    {
      signal,
    },
  );
  return data.message;
};
