import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, Fragment } from "react";
import { ReactComponent as AnglesArrow } from "../../../../assets/Icons/anglesArrow.svg";

import { Link, useSearchParams } from "react-router-dom";
import {
  getStatsByCity,
  getStatsByFacility,
} from "../../../../services/api/statsApi";
import "./StatsTable.scss";

const TableRowWithCollapse = ({ item, statsBy, adminRole, pdf }: any) => {
  const [isCollapse, setCollapse] = useState(!!(adminRole && pdf));
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
    enabled: !!(adminRole && pdf && statsBy === "2"),
    refetchOnWindowFocus: false,
  });

  const { data: facilityData, refetch: refetchFacality } = useQuery({
    queryKey: [`getStatsByFacility${item.province.id}`],
    queryFn: getStatsByFacility({ queryParams }),
    enabled: !!(adminRole && pdf && statsBy === "3"),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!(adminRole && pdf)) {
      setCollapse(false);
    }
  }, [adminRole, pdf, statsBy]);

  return (
    <>
      <tr
        key={item.province.id}
        onClick={() => {
          handleCollapse();
        }}
      >
        <td>{item.province.name}</td>
        <td>{item.results.minDaysUntilExamination} dni</td>
        <td>{Math.round(item.results.avgDaysUntilExamination)} dni</td>
        <td>{item.results.maxDaysUntilExamination} dni</td>
        {!pdf && (
          <td>
            <Link to={`/results?${linkTo.toString()}`}>Pokaż placówki</Link>
          </td>
        )}

        {statsBy === "2" || statsBy === "3" ? (
          <td>
            <AnglesArrow className="angleArrow" data-isopen={isCollapse} />
          </td>
        ) : null}
      </tr>
      {isCollapse && (
        <>
          {statsBy === "2" &&
            cityData?.data?.stats.map((item: any) => (
              <Fragment key={item.city.id}>
                {item.city && (
                  <tr className="inner">
                    <td className="ps-4">{item?.city?.name}</td>
                    <td>
                      {Math.round(item.results.minDaysUntilExamination)} dni
                    </td>
                    <td>{item.results.avgDaysUntilExamination} dni</td>
                    <td>{item.results.maxDaysUntilExamination} dni</td>
                    {!pdf && (
                      <td colSpan={2}>
                        <Link
                          to={`/results?${linkTo.toString()}&cityId=${
                            item.city.id
                          }`}
                        >
                          Pokaż placówki
                        </Link>
                      </td>
                    )}
                  </tr>
                )}
              </Fragment>
            ))}

          {statsBy === "3" &&
            facilityData?.data?.stats.map((item: any) => (
              <Fragment key={item.facility.id}>
                {item.facility && (
                  <tr className="inner" key={item.facility.id}>
                    <td className="ps-4">{item?.facility?.name}</td>
                    <td>
                      {Math.round(item.results?.minDaysUntilExamination)} dni
                    </td>
                    <td>{item.results.avgDaysUntilExamination} dni</td>
                    <td>{item.results.maxDaysUntilExamination} dni</td>
                    {!pdf && (
                      <td colSpan={2}>
                        <Link to={`/details/${item.facility.id}`}>
                          Pokaż szczegóły
                        </Link>
                      </td>
                    )}
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
