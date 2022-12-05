import axios from "axios";
import { provinces } from "../endpoints";

interface provincesDataTypes {
  id: number;
  name: string;
}

export const getProvinces = (provinceId?: string) => {
  return {
    queryKey: ["provinces"],
    queryFn: () => axios.get(provinces).then((res) => res.data.data),
    select: (data: provincesDataTypes[]) =>
      data.filter((province) => province.id.toString() === provinceId)
  };
};
