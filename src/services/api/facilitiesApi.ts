import axios from "axios";
import { detailedFacilities, facilities } from "../endpoints";

interface SerializerSettings {
  offset?: string;
  limit?: string;
  queueId?: string | null;
  serviceId?: string | null;
  provinceId?: string | null;
  cityId?: string | null;
  maxDaysToResults?: string | null;
  maxDaysUntilExamination?: string | null;
  rating?: string | null;
}

export const getFacilities = ({
  offset,
  limit,
  provinceId,
  serviceId,
  queueId,
  cityId,
  maxDaysToResults,
  maxDaysUntilExamination,
  rating
}: SerializerSettings) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(provinceId && { provinceId }),
    ...(serviceId && { serviceId }),
    ...(queueId && { queueId }),
    ...(cityId && { cityId }),
    ...(maxDaysToResults && { maxDaysToResults }),
    ...(maxDaysUntilExamination && { maxDaysUntilExamination }),
    ...(rating && { rating })
  });

  return {
    queryKey: [
      "detailedFacilities",
      `offset/${offset}`,
      `provinceId/${provinceId}`,
      `serviceId/${serviceId}`,
      `queueId/${queueId}`,
      `cityId/${cityId}`,
      `maxDaysToResults/${maxDaysToResults}`,
      `maxDaysUntilExamination/${maxDaysUntilExamination}`,
      `rating/${rating}`
    ],
    queryFn: () =>
      axios
        .get(`${detailedFacilities}?${params.toString()}`)
        .then((res) => res.data),
    retry: false
  };
};

interface SerializerSettings {
  facilityId?: string;
  serviceId?: string | null;
}

export const getFacilityByDepartment = ({
  facilityId,
  serviceId
}: SerializerSettings) => {
  return () =>
    axios
      .get(`${facilities}/${facilityId}/departments?serviceId=${serviceId}`)
      .then((res) => res.data);
};
