import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  getStatsByCity,
  getStatsByFacility,
} from "../../../../services/api/statsApi";
import "./StatsTable.scss";

const TableRowWithCollapse = ({ item, statsBy }: any) => {
  const [isCollapse, setCollapse] = useState(false);
  const isOdd = !!(item.province.id % 2) ? "odd" : "even";
  const [queryParams, setQueryParams] = useState({});

  const handleCollapse = () => {
    !isCollapse && statsBy === "2" && refetchCity();
    !isCollapse && statsBy === "3" && refetchFacality();
    setCollapse((prev) => !prev);
  };

  const [searchParams] = useSearchParams();

  const linkTo = new URLSearchParams({
    serviceId: searchParams.get("serviceId") || "217",
    queueId: searchParams.get("normal") ? "1" : "2",
    provinceId: item.province.id,
  });

  useEffect(() => {
    setQueryParams({
      serviceId: searchParams.get("serviceId") || "217",
      queueId: searchParams.get("normal") ? "1" : "2",
      provinceId: item.province.id,
      dateSince: new Date(new Date().setDate(new Date().getDate() - 30))
        .toISOString()
        .split("T")[0],
      dateTo:
        searchParams.get("dateTo") || new Date().toISOString().split("T")[0],
    });
  }, [item.province.id, searchParams]);

  const {
    data: cityData,
    refetch: refetchCity,
    remove: removeCity,
  } = useQuery({
    queryKey: ["getStatsByCity"],
    queryFn: getStatsByCity({ queryParams }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: facilityData,
    refetch: refetchFacality,
    remove: removeFacality,
  } = useQuery({
    queryKey: ["getStatsByFacility"],
    queryFn: getStatsByFacility({ queryParams }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setCollapse(false);
    removeCity();
    removeFacality();
  }, [removeCity, removeFacality, statsBy]);

  return (
    <>
      <tr
        key={item.province.id}
        onClick={() => {
          handleCollapse();
        }}
        className={isOdd}
      >
        <td>{item.province.name}</td>
        <td>{item.results[0].minDaysUntilExamination} dni</td>
        <td>{Math.round(item.results[0].avgDaysUntilExamination)} dni</td>
        <td>{item.results[0].maxDaysUntilExamination} dni</td>
        <td>
          <Link to={`/results?${linkTo.toString()}`}>Pokaż placówki</Link>
        </td>
      </tr>
      {isCollapse && (
        <>
          {statsBy === "2" &&
            cityData?.data.map((item: any) => (
              <Fragment key={item.city.id}>
                {item.city && (
                  <tr className="inner">
                    <td>{item?.city?.name}</td>
                    <td>
                      {Math.round(item.results.avgDaysUntilExamination)} dni
                    </td>
                    <td>{item.results.minDaysUntilExamination} dni</td>
                    <td colSpan={2}>
                      {item.results.maxDaysUntilExamination} dni
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}

          {statsBy === "3" &&
            facilityData?.data.map((item: any) => (
              <Fragment key={item.facility.id}>
                {item.facility && (
                  <tr className="inner" key={item.facility.id}>
                    <td>{item?.facility?.name}</td>
                    <td>
                      {Math.round(item.results[0]?.avgDaysUntilExamination)} dni
                    </td>
                    <td>{item.results[0].minDaysUntilExamination} dni</td>
                    <td colSpan={2}>
                      {item.results[0].maxDaysUntilExamination} dni
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
        </>
      )}
    </>
  );
};

export default TableRowWithCollapse;
