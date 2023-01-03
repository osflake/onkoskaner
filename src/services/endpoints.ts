const apiKey = sessionStorage.getItem("api_key");

const api =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development" || !apiKey
    ? `https://dev-api.alivia.org.pl/api/v1/`
    : `${apiKey}/api/v1/`;

const apiWP =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? `https://dev.onkoskaner.pl/wp-json/`
    : `https://onkoskaner.pl/wp-json/`;

export const facilities = `${api}facilities`;

export const services = `${api}services`;

export const provinces = `${api}provinces`;

export const cities = `${api}cities`;

export const detailedFacilities = `${api}detailed-facilities`;

export const stats = `${api}stats`;

export const otherTerm = `${api}tasks/create-from-user-report`;

export const surveyCalls = `${api}stats/survey-calls`;

export const reviews = `${api}facility-reviews`;

export const roles = `${apiWP}user/v1/roles`;

export const pdf = `${apiWP}wp/v2/pdf`;
