import axios from "axios";
import { stats } from "../endpoints";

export const getStatsByProvince = ({ queryParams, queueId, sortBy }: any) => {
  const sortArray = sortBy?.split(",");

  const searchParams = new URLSearchParams({
    serviceId: queryParams.serviceId,
    queueId: queueId,
    days: queryParams.days,
    dateTo: queryParams.dateTo,
    ...(sortArray && { orderBy: sortArray[0] }),
    ...(sortArray && { sortOrder: sortArray[1] }),
  });

  return () =>
    !!queryParams.serviceId
      ? axios
          .get(`${stats}/waiting-times-by-province?${searchParams.toString()}`)
          .then((res) => res.data)
      : null;
};

export const getStatsByDate = ({ queryParams, queueId }: any) => {
  const searchParams = new URLSearchParams({
    serviceId: queryParams.serviceId,
    provinceId: queryParams.provinceId,
    cityId: queryParams.cityId,
    days: queryParams.days,
    dateTo: queryParams.dateTo,
    queueId: queueId,
  });

  return () =>
    queryParams.serviceId
      ? axios
          .get(`${stats}/waiting-times-by-date?${searchParams.toString()}`)
          .then((res) => res.data)
      : null;
};

export const getStatsByCity = ({ queryParams, sortBy }: any) => {
  const sortArray = sortBy?.split(",");

  const searchParams = new URLSearchParams({
    serviceId: queryParams.serviceId,
    queueId: queryParams.queueId,
    days: queryParams.days,
    dateTo: queryParams.dateTo,
    provinceId: queryParams.provinceId,
    ...(sortArray && { orderBy: sortArray[0] }),
    ...(sortArray && { sortOrder: sortArray[1] }),
  });

  return () =>
    searchParams.toString() &&
    axios
      .get(`${stats}/waiting-times-by-cities?${searchParams.toString()}`)
      .then((res) => res.data);
};

export const getStatsByFacility = ({ queryParams, sortBy }: any) => {
  const sortArray = sortBy?.split(",");

  const searchParams = new URLSearchParams({
    serviceId: queryParams.serviceId,
    queueId: queryParams.queueId,
    days: queryParams.days,
    dateTo: queryParams.dateTo,
    provinceId: queryParams.provinceId,
    ...(sortArray && { orderBy: sortArray[0] }),
    ...(sortArray && { sortOrder: sortArray[1] }),
  });

  return () =>
    searchParams.toString() &&
    axios
      .get(`${stats}/waiting-times-by-facility?${searchParams.toString()}`)
      .then((res) => res.data);
};
