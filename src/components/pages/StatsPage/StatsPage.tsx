import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../../services/api/rolesApi";
import StatsTemplate from "../../templates/StatsTemplate/StatsTemplate";

const StatsPage = () => {
  const { data: userRole } = useQuery(getRoles(1));

  // return <StatsTemplate adminRole={!!userRole?.permission.administrator} />;
  return <StatsTemplate adminRole={true} />;
};

export default StatsPage;
