import React from "react";

const SwitchButton = ({ register, label }: SwitchButtonProps) => {
  return (
    <div className="form-check form-switch">
      <label className="form-check-label">
        <input
          className="form-check-input"
          {...register}
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          style={{ transform: "scale(1.3)" }}
          defaultValue={"true"}
        />
        {label}
      </label>
    </div>
  );
};

export default SwitchButton;
