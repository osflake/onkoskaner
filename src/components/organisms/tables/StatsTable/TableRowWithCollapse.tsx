import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, Fragment } from "react";
import anglesArrow from "../../../../assets/Icons/anglesArrow.svg";
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

  const { data: cityData, refetch: refetchCity } = useQuery({
    queryKey: [`getStatsByCity${item.province.id}`],
    queryFn: getStatsByCity({ queryParams }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: facilityData,
    refetch: refetchFacality,
    isFetchedAfterMount,
  } = useQuery({
    queryKey: [`getStatsByFacility${item.province.id}`],
    queryFn: getStatsByFacility({ queryParams }),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setCollapse(false);
  }, [statsBy]);

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
        {statsBy === "2" || statsBy === "3" ? (
          <td>
            <img
              src={anglesArrow}
              alt=""
              className="angleArrow"
              data-isopen={isCollapse}
            />
          </td>
        ) : null}
      </tr>
      {isCollapse && (
        <>
          {statsBy === "2" &&
            cityData?.data.stats.map((item: any) => (
              <Fragment key={item.city.id}>
                {item.city && (
                  <tr className="inner">
                    <td className="ps-4">{item?.city?.name}</td>
                    <td>
                      {Math.round(item.results.avgDaysUntilExamination)} dni
                    </td>
                    <td>{item.results.minDaysUntilExamination} dni</td>
                    <td>{item.results.maxDaysUntilExamination} dni</td>
                    <td colSpan={2}>
                      <Link to={`/results?${linkTo.toString()}`}>
                        Pokaż placówki
                      </Link>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}

          {statsBy === "3" &&
            isFetchedAfterMount &&
            facilityData?.data.stats.map((item: any) => (
              <Fragment key={item.facility.id}>
                {item.facility && (
                  <tr className="inner" key={item.facility.id}>
                    <td className="ps-4">{item?.facility?.name}</td>
                    <td>
                      {Math.round(item.results?.avgDaysUntilExamination)} dni
                    </td>
                    <td>{item.results.minDaysUntilExamination} dni</td>
                    <td>{item.results.maxDaysUntilExamination} dni</td>
                    <td colSpan={2}>
                      <Link to={`/results?${linkTo.toString()}`}>
                        Pokaż placówki
                      </Link>
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
