import OtherStatsTable from "../tables/OtherStatsTable/OtherStatsTable";
import "./OtherStats.scss";

const OtherStats = () => {
  return (
    <div className="d-flex flex-column gap-5 w-100">
      <div className="breakLine my-5"></div>
      <p className="fw-bold results-title mt-4 mb-1 fs-1 ">Pozostałe raporty</p>
      <OtherStatsTable />
    </div>
  );
};

export default OtherStats;
