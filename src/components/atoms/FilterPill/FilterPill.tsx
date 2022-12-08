import Button from "react-bootstrap/Button";

import "./FilterPill.scss";

interface FilterPillProps {
  title?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const FilterPill = ({
  title = "Button",
  onClick,
  isActive = false
}: FilterPillProps) => {
  return (
    <Button
      onClick={onClick}
      className={`btn-sm ${
        isActive
          ? "btn-pill-outline-primary-active"
          : "btn-pill-outline-primary"
      }`}
    >
      {title}
    </Button>
  );
};

export default FilterPill;
