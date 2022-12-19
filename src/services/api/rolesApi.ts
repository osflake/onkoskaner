import axios from "axios";
import { roles } from "../endpoints";

export const getRoles = (userId: number) => {
  return {
    queryKey: ["roles"],
    queryFn: () =>
      axios.get(`${roles}?userId=${userId}`).then((res) => res.data),
  };
};
