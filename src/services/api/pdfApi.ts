import axios from "axios";

export const getPdf = ({ offset, limit = 10 }: any) => {
  const params = new URLSearchParams({
    ...(offset && { offset }),
    ...(limit && { per_page: limit }),
  });
  return {
    queryKey: [`pdf/${offset}`],
    queryFn: () =>
      axios
        .get(`http://dev.onkoskaner.pl/wp-json/wp/v2/pdf?${params}`)
        .then((res) => res.data),
  };
};
