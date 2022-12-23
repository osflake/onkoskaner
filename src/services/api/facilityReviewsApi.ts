import axios from "axios";
import { reviews } from "../endpoints";

interface PayloadArgs {
  facility: number;
  // name: string;
  rating: number;
  addedByUser: number;
  content: string;
}

export const postFacilityReview = () => {
  return {
    mutationFn: (payload: PayloadArgs) => axios.post(reviews, payload)
  };
};
