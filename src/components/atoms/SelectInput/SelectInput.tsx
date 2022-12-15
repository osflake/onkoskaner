import "./SelectInput.scss";

const SelectInput = ({
  label,
  dropdownData,
  register,
  disabled,
  onChange,
  defaultValue,
}: SelectInputProps) => {
  return (
    <label className="w-100 ">
      <p className="selectInputLabel">{label}</p>
      <select
        className="form-select"
        aria-label="Default select example"
        disabled={disabled}
        onChangeCapture={onChange}
        {...register}
      >
        {/* {currInterval === "currInterval" && (
          <option value="99">wybrany okres</option>
        )} */}

        {defaultValue ? null : <option value="all">Wszystkie</option>}
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
