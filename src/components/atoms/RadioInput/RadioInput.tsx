import "./RadioInput.scss";

const RadioInput = ({ label, register, value, checked }: RadioInputProps) => {
  return (
    <label className="form-check-label form-check  m-0 col-12 col-sm ">
      <input
        className="form-check-input custom-radioInput-pink"
        type="radio"
        name="inlineRadioOptions"
        value={value}
        {...register}
        checked={checked}
      />
      {label}
    </label>
  );
};

export default RadioInput;
