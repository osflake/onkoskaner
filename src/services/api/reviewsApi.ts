import axios from "axios";
import { facilities } from "../endpoints";

export const getReviews = ({
  offset,
  limit = 3,
  facilityId,
  context,
  source
}: any) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(context && { context })
  });

  return {
    queryKey: [`reviews/offset:${offset}/context:${context}`],
    refetchOnWindowFocus: false,
    queryFn: () =>
      axios
        .get(
          `${facilities}/${facilityId}/reviews?${params}&status=ACCEPTED&source=1`
        )
        .then((res) => res.data)
  };
};
