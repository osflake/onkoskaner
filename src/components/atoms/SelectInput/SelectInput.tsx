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
    <label className="w-100 col-12 col-sm p-0">
      <p className="selectInputLabel">{label}</p>
      <select
        className="form-select"
        aria-label="Default select example"
        disabled={disabled}
        onChangeCapture={onChange}
        {...register}
      >
        {defaultValue ? null : <option value="">Wszystkie</option>}
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
