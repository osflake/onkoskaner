import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, Fragment } from "react";
import { ReactComponent as AnglesArrow } from "../../../../assets/Icons/anglesArrow.svg";

import { Link, useSearchParams } from "react-router-dom";
import {
  getStatsByCity,
  getStatsByFacility,
} from "../../../../services/api/statsApi";
import "./StatsTable.scss";

const TableRowWithCollapse = ({
  item,
  statsBy,
  adminRole,
  pdf,
  setCollapseId,
  isOpen,
}: any) => {
  const [isCollapse, setCollapse] = useState(!!(adminRole && pdf));
  const [queryParams, setQueryParams] = useState({});

  const handleCollapse = () => {
    !isCollapse && statsBy === "2" && refetchCity();
    !isCollapse && statsBy === "3" && refetchFacality();
    setCollapse((prev) => !prev);
    setCollapseId((prev: any) => ({
      ...prev,
      [item.province.id]: !isCollapse,
    }));
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
      days: searchParams.get("days") || "30",
      dateTo:
        searchParams.get("dateTo") || new Date().toISOString().split("T")[0],
    });
  }, [item.province.id, searchParams]);

  const {
    data: cityData,
    refetch: refetchCity,
    isLoading: loadingCity,
  } = useQuery({
    queryKey: [
      `getStatsByCity${item.province.id}${searchParams.get("sortBy")}`,
      !!Object.keys(queryParams).length,
    ],
    queryFn: getStatsByCity({
      queryParams: queryParams,
      sortBy: searchParams.get("sortBy"),
    }),
    enabled:
      !!Object.keys(queryParams).length && !!(adminRole && statsBy === "2"),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: facilityData,
    refetch: refetchFacality,
    isLoading: loadingFacility,
  } = useQuery({
    queryKey: [
      `getStatsByFacility${item.province.id}${searchParams.get("sortBy")}`,
      !!Object.keys(queryParams).length,
    ],
    queryFn: getStatsByFacility({
      queryParams: queryParams,
      sortBy: searchParams.get("sortBy"),
    }),
    enabled:
      !!Object.keys(queryParams).length && !!(adminRole && statsBy === "3"),
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!pdf && isOpen) {
      setTimeout(() => {
        !isCollapse && statsBy === "2" && refetchCity();
        !isCollapse && statsBy === "3" && refetchFacality();
        setCollapse(isOpen);
      }, 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!(adminRole && pdf)) {
  //     setCollapse(false);
  //   }
  // }, [adminRole, pdf, statsBy]);

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
                    <td>
                      {Math.round(item.results.avgDaysUntilExamination)} dni
                    </td>
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
          {isCollapse && loadingCity && statsBy === "2" && (
            <tr className="inner">
              <td colSpan={6} className="tableSpinner" role="status">
                <div className="spinner-border">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}

          {statsBy === "3" &&
            facilityData?.data?.stats.map((item: any) => (
              <Fragment key={item.facility.id}>
                {item.facility && (
                  <tr className="inner" key={item.facility.id}>
                    <td className="ps-4">{item?.facility?.name}</td>
                    <td>
                      {Math.round(item.results?.minDaysUntilExamination)} dni
                    </td>
                    <td>
                      {Math.round(item.results.avgDaysUntilExamination)} dni
                    </td>
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

          {isCollapse && loadingFacility && statsBy === "3" && (
            <tr className="inner">
              <td colSpan={6} className="tableSpinner" role="status">
                <div className="spinner-border">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </td>
            </tr>
          )}
        </>
      )}
    </>
  );
};

export default TableRowWithCollapse;

// !!Object.keys(queryParams).length
