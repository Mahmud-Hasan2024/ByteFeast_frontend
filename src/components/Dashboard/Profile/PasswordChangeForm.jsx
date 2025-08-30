import { useState } from "react";
import { ChevronDown, Eye, EyeOff, Lock } from 'lucide-react'; // Icons for password section

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
    <div className="mt-6 border-t border-base-200 pt-6"> {/* Subtle separator */}
      <button
        type="button"
        className="btn btn-ghost p-0 justify-start text-primary font-semibold h-auto min-h-0 text-lg flex items-center gap-2 hover:bg-transparent"
        onClick={() => setIsPasswordSectionOpen(!isPasswordSectionOpen)}
        disabled={!isEditing} // Disable button if not editing
      >
        <Lock size={20} className="text-primary"/>
        Change Password
        <ChevronDown 
          size={18} 
          className={`ml-2 transform transition-transform duration-300 ${isPasswordSectionOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isPasswordSectionOpen && isEditing && ( 
        <div className="mt-4 space-y-4 pl-4 border-l-2 border-primary/50 bg-base-200 p-4 rounded-lg shadow-inner"> {/* Enhanced expanded section */}
          {/* Current Password */}
          <div className="form-control">
            <label className="label text-neutral-content">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered bg-base-100 w-full pr-10 focus:ring-primary focus:border-primary transition-all duration-200"
                {...register("current_password", passwordRules("current_password"))}
              />
              <span 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-neutral-content"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
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
                className="input input-bordered bg-base-100 w-full pr-10 focus:ring-primary focus:border-primary transition-all duration-200"
                {...register("new_password", passwordRules("new_password"))}
              />
              <span 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-neutral-content"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
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
                className="input input-bordered bg-base-100 w-full pr-10 focus:ring-primary focus:border-primary transition-all duration-200"
                {...register("confirm_new_password", passwordRules("confirm_new_password"))}
              />
              <span 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-neutral-content"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.confirm_new_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_new_password.message}
              </p>
            )}
          </div>

          {/* Show Password Checkbox  */}
          <div className="form-control mt-4">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <span className="label-text text-neutral-content">Show Passwords</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
