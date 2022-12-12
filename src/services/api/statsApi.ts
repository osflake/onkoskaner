import axios from "axios";
import { stats } from "../endpoints";

export const getStatsByProvince = () => {
  return {
    queryKey: ["StatsByProvince"],
    queryFn: () =>
      axios.get(`${stats}/waiting-times-by-province`).then((res) => res.data),
  };
};
