import axios from "axios";
import { facilities } from "../endpoints";

export const getReviews = ({ offset, limit = 3, facilityId }: any) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { limit })
  });

  return {
    queryKey: [`offset/${offset}`],
    queryFn: () =>
      axios
        .get(`${facilities}/${facilityId}/reviews?${params}&status=ACCEPTED`)
        .then((res) => res.data)
  };
};
