import { provincesApi } from "../services/api/onkoSkanerApi";
import { useQuery } from "@tanstack/react-query";

const queryName = "provincesData";

interface provincesResData {
  id: number;
  name: string;
}

const ProvincesDataQuery = async () => {
  const { data } = await provincesApi.get(``, {});
  return data.data;
};

export const useProvincesQuery = () => {
  return useQuery<provincesResData[]>([queryName], () => ProvincesDataQuery());
};
