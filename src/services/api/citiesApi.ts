import axios from "axios";
import { cities } from "../endpoints";

interface citiesProps {
  offset?: string;
  limit?: string;
  provinceId?: string;
  q?: string;
}

export const getCities = ({ offset, limit, provinceId, q }: citiesProps) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(provinceId && { provinceId }),
    ...(q && { q }),
  });

  return {
    queryKey: ["cities"],
    queryFn: () =>
      axios.get(`${cities}?${params.toString()}`).then((res) => res.data),
  };
};
