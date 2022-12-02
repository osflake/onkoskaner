import axios from "axios";
import { facilities } from "../endpoints";

export const getFacilities = ({ offset, limit }: any) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { limit }),
  });

  return {
    queryKey: ["facilities"],
    queryFn: () =>
      axios.get(`${facilities}?${params.toString()}`).then((res) => res.data),
  };
};
