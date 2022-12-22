import axios from "axios";
import { roles } from "../endpoints";

export const getRoles = (userId: any) => {
  return {
    queryFn: () =>
      userId && axios.get(`${roles}?userId=${userId}`).then((res) => res.data),
  };
};
