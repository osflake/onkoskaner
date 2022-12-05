import axios from "axios";
import { facilities } from "../endpoints";

interface SerializerSettings {
  offset?: string;
  limit?: string;
  provinceId?: string;
}

export const getFacilities = ({
  offset,
  limit,
  provinceId
}: SerializerSettings) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(provinceId && { provinceId })
  });

  return {
    queryKey: ["facilities"],
    queryFn: () =>
      axios.get(`${facilities}?${params.toString()}`).then((res) => res.data)
  };
};
