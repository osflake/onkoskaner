import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./SelectInput.scss";

const SelectInput = ({
  label,
  dropdownData,
  register,
  disabled,
  onChange,
  interval,
}: SelectInputProps) => {
  const [search] = useSearchParams();
  const [isInterval, setIsInterval] = useState(false);

  useEffect(() => {
    if (
      search.get("dateTo") &&
      search.get("dateTo") !== new Date().toISOString().split("T")[0]
    ) {
      setIsInterval(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <label className="w-100 col-12 col-sm p-0">
      <p className="selectInputLabel">{label}</p>
      <select
        className="form-select"
        aria-label="Default select example"
        disabled={disabled}
        onChangeCapture={onChange}
        {...register}
      >
        {interval ? null : <option value="">Wszystkie</option>}
        {interval &&
        isInterval &&
        search.get("dateTo") &&
        search.get("dateTo") !== new Date().toISOString().split("T")[0] ? (
          <option value="0">Wybrany przedział</option>
        ) : null}
        {dropdownData?.map((item: { id: string; name: string }) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
