import axios from "axios";
import { stats } from "../endpoints";

export const getStatsByProvince = () => {
  return {
    queryKey: ["StatsByProvince"],
    queryFn: () =>
      axios.get(`${stats}/waiting-times-by-province`).then((res) => res.data),
  };
};

export const getStatsByDate = ({ queryParams }: any) => {
  const searchParams = new URLSearchParams({
    serviceId: queryParams.serviceId,
    provinceId: queryParams.provinceId,
    cityId: queryParams.cityId,
    days: queryParams.days,
    dateTo: queryParams.dateTo,
  });

  return {
    queryKey: [queryParams],
    queryFn: () =>
      searchParams.toString() &&
      axios
        .get(`${stats}/waiting-times-by-date?${searchParams.toString()}`)
        .then((res) => res.data),
  };
};

export const getStatsByCity = ({ queryParams }: any) => {
  const searchParams = new URLSearchParams({
    ...queryParams,
  });

  return () =>
    searchParams.toString() &&
    axios
      .get(`${stats}/waiting-times-by-cities?${searchParams.toString()}`)
      .then((res) => res.data);
};
