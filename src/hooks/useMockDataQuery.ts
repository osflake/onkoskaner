import { mockiResultsApi } from "../services/api/mockiApi";
import { useQuery } from "@tanstack/react-query";

const queryName = "mockData";

interface addressData {
  building_number: string;
  city: any;
  zipCode: string;
  street?: string;
}

export interface resData {
  address: addressData;
  earliest_appointment: string;
  id: string;
  examination_waiting_time: 4;
  name: string;
  rating: string;
  rating_amount: string;
  successful_phone_calls: string;
}

const ResultsDataQuery = async () => {
  const { data } = await mockiResultsApi.get(``, {});

  return data.data;
};

export const useMockDataQuery = () => {
  return useQuery<resData[]>([queryName], () => ResultsDataQuery());
};
