import "./RadioInput.scss";

const RadioInput = ({ label, register, value }: RadioInputProps) => {
  return (
    <div className="form-check form-check-inline">
      <label className="form-check-label  ">
        <input
          className="form-check-input custom-radioInput-pink"
          type="radio"
          name="inlineRadioOptions"
          value={value}
          {...register}
        />
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
