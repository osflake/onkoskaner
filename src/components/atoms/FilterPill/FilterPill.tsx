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
  filterId = 12,
}: FilterPillProps) => {
  const [active, setActive] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.getAll("service").includes(filterId.toString())) {
      setActive((prev) => (prev = true));
    } else {
      setActive((prev) => (prev = false));
    }
  }, [filterId, searchParams]);

  const handleClick = () => {
    setActive((prevState) => !prevState);
    !active
      ? setSearchParams({
          service: [...searchParams.getAll("service"), filterId.toString()],
        })
      : setSearchParams({
          service: [
            ...searchParams
              .getAll("service")
              .filter((param) => param !== filterId.toString()),
          ],
        });
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
