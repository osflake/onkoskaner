const apiKey = sessionStorage.getItem("api_key");

export const api = apiKey
  ? `${apiKey}/api/v1/`
  : "https://dev-api.alivia.org.pl/api/v1/";

export const facilities = `${api}facilities`;

export const services = `${api}services`;

export const provinces = `${api}provinces`;

export const cities = `${api}cities`;

export const detailedFacilities = `${api}detailed-facilities`;

export const stats = `${api}stats`;

export const otherTerm = `${api}tasks/create-from-user-report`;

export const reviews = `${api}facility-reviews`;

export const roles = `http://dev.onkoskaner.pl/wp-json/user/v1/roles`;
