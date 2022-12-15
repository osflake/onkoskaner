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
    city: queryParams.city || "all",
    dateTo: queryParams.dateTo || new Date().toISOString().split("T")[0],
    days: queryParams.days || "30",
    normal: queryParams.normal || "true",
    province: queryParams.province || "all",
    service: queryParams.service || "217",
    urgent: queryParams.urgent || "false",
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
