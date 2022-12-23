import axios from "axios";
import { otherTerm } from "../endpoints";

interface PayloadArgs {
  facilityId: number;
  serviceId: number;
  queueId: number;
  respondentType: number;
  content: string;
}

export const postOtherTerm = () => {
  return {
    mutationFn: (payload: PayloadArgs) => axios.post(otherTerm, payload)
  };
};
