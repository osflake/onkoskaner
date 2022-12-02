import axios from "axios";
import { services } from "../endpoints";

export const getServices = ({ active, offset, limit }: any) => {
  const params = new URLSearchParams({
    ...(active && { active }),
    ...(offset && { offset }),
    ...(limit && { limit }),
  });

  return {
    queryKey: ["services"],
    queryFn: () =>
      axios.get(`${services}?${params.toString()}`).then((res) => res.data),
  };
};
