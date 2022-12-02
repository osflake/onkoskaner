import axios from "axios"

export const provincesApi = axios.create({
  baseURL: "https://dev-api.alivia.org.pl/api/v1/provinces"
})
