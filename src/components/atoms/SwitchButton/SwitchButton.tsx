const SwitchButton = ({ register, label }: SwitchButtonProps) => {
  return (
    <div className="ps-5 form-check form-switch">
      <label className="form-check-label">
        <input
          className="form-check-input"
          {...register}
          type="checkbox"
          role="switch"
          style={{ transform: "scale(1.3)" }}
        />
        {label}
      </label>
    </div>
  );
};

export default SwitchButton;
