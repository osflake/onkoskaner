import axios from "axios"

export const mockiResultsApi = axios.create({
  baseURL: "https://mocki.io/v1/f0e3242e-6784-4e93-a5e7-ff98e3a7d400"
})
