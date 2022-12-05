import axios from "axios";
import { facilities } from "../endpoints";

interface SerializerSettings {
  offset?: string;
  limit?: string;
}

export const getFacilities = ({ offset, limit }: SerializerSettings) => {
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
