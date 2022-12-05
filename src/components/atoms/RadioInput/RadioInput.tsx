import "./RadioInput.scss";

const RadioInput = ({ label }: RadioInputProps) => {
  return (
    <div className="form-check form-check-inline me-4">
      <label className="form-check-label ">
        <input
          className="form-check-input pink"
          type="radio"
          name="inlineRadioOptions"
          value="option2"
        />
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
