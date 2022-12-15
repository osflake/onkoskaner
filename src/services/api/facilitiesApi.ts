import axios from "axios";
import { detailedFacilities } from "../endpoints";

interface SerializerSettings {
  offset?: string;
  limit?: string;
  queueId?: string | null;
  serviceId?: string | null;
  provinceId?: string | null;
}

export const getFacilities = ({
  offset,
  limit,
  provinceId,
  serviceId,
  queueId
}: SerializerSettings) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(provinceId && { provinceId }),
    ...(serviceId && { serviceId }),
    ...(queueId && { queueId })
  });

  return {
    queryKey: ["detailedFacilities"],
    queryFn: () =>
      axios
        .get(`${detailedFacilities}?${params.toString()}`)
        .then((res) => res.data.data),
    retry: false
  };
};
