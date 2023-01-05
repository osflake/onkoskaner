import axios from "axios";
import { surveyCalls } from "../endpoints";

export const getSurveyCalls = ({ facilityId, serviceId, queueId }: any) => {
  const params = new URLSearchParams({
    ...(facilityId && { facilityId }),
    ...(serviceId && { serviceId }),
    ...(queueId && { queueId })
  });

  return {
    queryKey: [`SurveyCalls/serviceId:${serviceId}/queueId:${queueId}`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      axios.get(`${surveyCalls}?${params.toString()}`).then((res) => res.data)
  };
};
