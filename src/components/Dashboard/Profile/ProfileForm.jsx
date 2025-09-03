import { User, Mail, Home, Phone } from 'lucide-react';

const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {/* First Name */}
      <div className="form-control">
        <label className="label text-neutral-content" htmlFor="first_name">
          <span className="label-text flex items-center gap-2">
            <User size={16} className="text-primary"/>First Name
          </span>
        </label>
        <input
          id="first_name"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("first_name", { required: isEditing ? "First name is required" : false })}
        />
        {isEditing && errors.first_name && (
          <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
        )}
      </div>

      {/* Last Name */}
      <div className="form-control">
        <label className="label text-neutral-content" htmlFor="last_name">
          <span className="label-text flex items-center gap-2">
            <User size={16} className="text-primary"/>Last Name
          </span>
        </label>
        <input
          id="last_name"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("last_name", { required: isEditing ? "Last name is required" : false })}
        />
        {isEditing && errors.last_name && (
          <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>
        )}
      </div>

      {/* Email (read-only) */}
      <div className="form-control md:col-span-2">
        <label className="label text-neutral-content" htmlFor="email">
          <span className="label-text flex items-center gap-2">
            <Mail size={16} className="text-primary"/>Email Address
          </span>
        </label>
        <input
          id="email"
          type="email"
          className="input input-bordered bg-base-200 w-full"
          disabled
          {...register("email")}
        />
      </div>

      {/* Address */}
      <div className="form-control md:col-span-2">
        <label className="label text-neutral-content" htmlFor="address">
          <span className="label-text flex items-center gap-2">
            <Home size={16} className="text-primary"/>Address
          </span>
        </label>
        <input
          id="address"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("address", { required: isEditing ? "Address is required" : false })}
        />
        {isEditing && errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div className="form-control md:col-span-2">
        <label className="label text-neutral-content" htmlFor="phone_number">
          <span className="label-text flex items-center gap-2">
            <Phone size={16} className="text-primary"/>Phone Number
          </span>
        </label>
        <input
          id="phone_number"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("phone_number", { required: isEditing ? "Phone number is required" : false })}
        />
        {isEditing && errors.phone_number && (
          <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;