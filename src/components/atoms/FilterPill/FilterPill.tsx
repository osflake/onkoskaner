import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./FilterPill.scss";

interface FilterPillProps {
  title?: string;
  onClick?: () => void;
  filterByName?: string;
  filterId?: any;
}

const FilterPill = ({
  title = "Button",
  onClick,
  filterByName = "service",
  filterId = 12
}: FilterPillProps) => {
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.getAll(filterByName).includes(filterId.toString())) {
      setActive((prev) => (prev = true));
    } else {
      setActive((prev) => (prev = false));
    }
  }, [filterId, searchParams, filterByName]);

  const handleClick = () => {
    setActive((prevState) => !prevState);
    if (!active) {
      searchParams.append(filterByName, filterId.toString());
      setSearchParams(searchParams);
    } else {
      const values = searchParams.getAll(filterByName);
      searchParams.delete(filterByName);
      values.forEach((value) => {
        if (value !== filterId.toString()) {
          searchParams.append(filterByName, value);
          setSearchParams(searchParams);
        } else {
          setSearchParams(searchParams);
        }
      });
    }
  };

  return (
    <Button
      onClick={onClick ? onClick : () => handleClick()}
      className={`btn-sm text-nowrap ${
        active ? "btn-pill-outline-primary-active" : "btn-pill-outline-primary"
      }`}
    >
      {title}
    </Button>
  );
};

export default FilterPill;
