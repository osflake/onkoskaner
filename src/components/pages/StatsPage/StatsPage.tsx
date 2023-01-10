import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../../services/api/rolesApi";
import StatsTemplate from "../../templates/StatsTemplate/StatsTemplate";

const StatsPage = () => {
  const userId = sessionStorage.getItem("userId");

  const { data: userRole } = useQuery([userId], getRoles(userId));

  return <StatsTemplate adminRole={!userRole?.permission?.administrator} />;
};

export default StatsPage;
