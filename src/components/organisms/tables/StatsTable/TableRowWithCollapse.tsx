import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./StatsTable.scss";

const TableRowWithCollapse = ({ item }: any) => {
  const [isCollapse, setCollapse] = useState(false);
  const isOdd = !!(item.province.id % 2) ? "odd" : "even";

  const handleCollapse = () => {
    setCollapse((prev) => !prev);
  };

  const [searchParams] = useSearchParams();

  const linkTo = new URLSearchParams({
    serviceId: searchParams.get("serviceId") || "217",
    queueId: searchParams.get("normal") ? "1" : "2",
    provinceId: item.province.id,
  });

  return (
    <>
      <tr key={item.province.id} onClick={handleCollapse} className={isOdd}>
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
          <tr className="innner">
            <td>Tarnogród</td>
            <td>15 dni</td>
            <td>12 dni</td>
            <td colSpan={2}>2 dni</td>
          </tr>
          <tr className="innner">
            <td>Tarnogród</td>
            <td>15 dni</td>
            <td>12 dni</td>
            <td colSpan={2}>2 dni</td>
          </tr>
          <tr className="innner">
            <td>Tarnogród</td>
            <td>15 dni</td>
            <td>12 dni</td>
            <td colSpan={2}>2 dni</td>
          </tr>
        </>
      )}
    </>
  );
};

export default TableRowWithCollapse;
