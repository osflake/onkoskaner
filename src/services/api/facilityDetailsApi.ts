import axios from "axios";
import { facilities } from "../endpoints";

export const getFacilityDetails = (facilityId?: string) => {
  return {
    queryKey: [`facility/${facilityId}`],
    queryFn: () =>
      axios
        .get(`${facilities}/${facilityId}/details`)
        .then((res) => res.data.data)
  };
};
