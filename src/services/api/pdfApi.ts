import axios from "axios";
// import { stats } from "../endpoints";

export const getPdf = () => {
  return {
    queryKey: ["pdf"],
    queryFn: () =>
      axios
        .get(`http://dev.onkoskaner.pl/wp-json/wp/v2/pdf`)
        .then((res) => res.data),
  };
};
