import axios from "axios";
import { detailedFacilities } from "../endpoints";

export const getFacilityDetails = (facilityId?: string) => {
  return {
    queryKey: [`facility/${facilityId}`],
    queryFn: () =>
      axios
        .get(`${detailedFacilities}/${facilityId}`)
        .then((res) => res.data.data)
  };
};
