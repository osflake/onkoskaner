const apiKey = sessionStorage.getItem("api_key");

const api = apiKey ? `${apiKey}` : "https://dev-api.alivia.org.pl";

const apiV1 = `${api}/api/v1/`;
const apiWP = `${api}/wp-json/`;

export const facilities = `${apiV1}facilities`;

export const services = `${apiV1}services`;

export const provinces = `${apiV1}provinces`;

export const cities = `${apiV1}cities`;

export const detailedFacilities = `${apiV1}detailed-facilities`;

export const stats = `${apiV1}stats`;

export const otherTerm = `${apiV1}tasks/create-from-user-report`;

export const surveyCalls = `${api}stats/survey-calls`;

export const reviews = `${apiV1}facility-reviews`;

export const roles = `${apiWP}user/v1/roles`;
