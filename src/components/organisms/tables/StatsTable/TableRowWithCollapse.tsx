import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getStatsByCity } from "../../../../services/api/statsApi";
import "./StatsTable.scss";

const TableRowWithCollapse = ({ item, statsBy }: any) => {
  const [isCollapse, setCollapse] = useState(false);
  const isOdd = !!(item.province.id % 2) ? "odd" : "even";
  const [queryParams, setQueryParams] = useState({});

  console.log(statsBy);

  const handleCollapse = () => {
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

  console.log(queryParams);

  const { data, refetch, isRefetching, dataUpdatedAt, remove } = useQuery({
    queryKey: ["getStatsByCity"],
    queryFn: getStatsByCity({ queryParams }),
    enabled: false,
  });

  useEffect(() => {
    setCollapse(false);
    remove();
  }, [statsBy]);

  console.log(data);

  console.log(isRefetching, dataUpdatedAt);

  return (
    <>
      <tr
        key={item.province.id}
        onClick={() => {
          handleCollapse();
          !isCollapse && statsBy === "2" && refetch();
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
      {!isRefetching && isCollapse && (
        <>
          {data?.data.map((item: any) => (
            <tr className="inner">
              <td>{item.city.name}</td>
              <td>{Math.round(item.results.avgDaysUntilExamination)} dni</td>
              <td>{item.results.minDaysUntilExamination} dni</td>
              <td colSpan={2}>{item.results.maxDaysUntilExamination} dni</td>
            </tr>
          ))}
        </>
      )}
    </>
  );
};

export default TableRowWithCollapse;
