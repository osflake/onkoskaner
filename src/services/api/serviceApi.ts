import axios from "axios";
import { services } from "../endpoints";

type id = string | null;

export const getServiceById = (id: id) => {
  return {
    queryKey: [`service:${id}`],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: () =>
      id
        ? axios.get(`${services}/${id}`).then((res) => res.data.data)
        : Promise.resolve({ name: "Wszystkie badania" }).then((res) => res)
  };
};
