import "./RadioInput.scss";

const RadioInput = ({ label, register, value, checked }: RadioInputProps) => {
  return (
    <div className="form-check form-check-inline m-0">
      <label className="form-check-label">
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
    </div>
  );
};

export default RadioInput;
