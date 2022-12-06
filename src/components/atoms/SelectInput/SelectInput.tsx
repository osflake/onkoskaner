import "./SelectInput.scss";

const SelectInput = ({
  label,
  dropdownData,
  register,
  disabled,
}: SelectInputProps) => {
  return (
    <label className="w-100 ">
      <p className="selectInputLabel">{label}</p>
      <select
        className="form-select"
        aria-label="Default select example"
        defaultValue="all"
        disabled={disabled}
        {...register}
      >
        <option value="all">Wszystkie</option>
        {dropdownData.map((item: { id: string; name: string }) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
