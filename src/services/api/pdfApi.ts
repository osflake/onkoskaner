import axios from "axios";
import { pdf } from "../endpoints";

export const getPdf = ({ offset, limit = 10 }: any) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { per_page: limit }),
  });
  return {
    queryKey: [`pdf/${offset}`],
    queryFn: () => axios.get(`${pdf}?${params}`).then((res) => res.data),
    refetchOnWindowFocus: false,
  };
};
