import { useState } from "react";

const PasswordChangeForm = ({ 
  register, 
  errors, 
  watch, 
  isEditing, 
  isPasswordSectionOpen,
  setIsPasswordSectionOpen
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordRules = (fieldName) => {
    if (!isPasswordSectionOpen || !isEditing) {
      return {};
    }

    switch (fieldName) {
      case "current_password":
        return { required: "Current Password is required to change password" };
      case "new_password":
        return { 
          required: "New Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        };
      case "confirm_new_password":
        return {
          required: "Confirm New Password is required",
          validate: (value) =>
            value === watch("new_password") || "Passwords do not match",
        };
      default:
        return {};
    }
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        className="btn btn-link p-0 justify-start text-primary font-semibold h-auto min-h-0"
        onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
      >
        Change Password
      </button>

      {isPasswordSectionOpen && isEditing && ( 
        <div className="mt-3 space-y-3 pl-2 border-l-2 border-base-300">
          {/* Current Password */}
          <div className="form-control">
            <label className="label text-neutral-content">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered bg-base-200 w-full pr-10"
                {...register("current_password", passwordRules("current_password"))}
              />
            </div>
            {errors.current_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.current_password.message}
              </p>
            )}
          </div>
          {/* New Password */}
          <div className="form-control">
            <label className="label text-neutral-content">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered bg-base-200 w-full pr-10"
                {...register("new_password", passwordRules("new_password"))}
              />
            </div>
            {errors.new_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.new_password.message}
              </p>
            )}
          </div>
          {/* Confirm New Password */}
          <div className="form-control">
            <label className="label text-neutral-content">Confirm New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered bg-base-200 w-full pr-10"
                {...register("confirm_new_password", passwordRules("confirm_new_password"))}
              />
            </div>
            {errors.confirm_new_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_new_password.message}
              </p>
            )}
          </div>

          {/* Show Password Checkbox  */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text text-neutral-content">Show Password</span>
              <input
                type="checkbox"
                className="toggle"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
