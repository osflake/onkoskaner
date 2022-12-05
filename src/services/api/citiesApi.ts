import axios from "axios";
import { cities } from "../endpoints";

export const getCities = () => {
  return {
    queryKey: ["cities"],
    queryFn: () => axios.get(cities).then((res) => res.data)
  };
};
