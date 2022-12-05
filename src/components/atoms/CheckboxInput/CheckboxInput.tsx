import "./CheckboxInput.scss";

const CheckboxInput = ({ label }: RadioInputProps) => {
  return (
    <div className="form-check form-check-inline me-4">
      <label className="form-check-label ">
        <input
          className="form-check-input custom-checkbox-pink"
          type="checkbox"
          name="inlineRadioOptions"
          value="option2"
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
