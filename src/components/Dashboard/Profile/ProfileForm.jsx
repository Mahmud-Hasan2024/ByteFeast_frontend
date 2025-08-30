import { User, Mail, Home, Phone } from 'lucide-react';

const ProfileForm = ({ register, errors, isEditing }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      <div className="form-control">
        <label className="label text-neutral-content" htmlFor="first_name">
          <span className="label-text flex items-center gap-2"><User size={16} className="text-primary"/>First Name</span>
        </label>
        <input
          id="first_name"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("first_name", { 
            required: isEditing ? "First name is required" : false 
          })}
        />
        {isEditing && errors.first_name && ( 
          <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label text-neutral-content" htmlFor="last_name">
          <span className="label-text flex items-center gap-2"><User size={16} className="text-primary"/>Last Name</span>
        </label>
        <input
          id="last_name"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("last_name")}
        />
      </div>

      <div className="form-control md:col-span-2">
        <label className="label text-neutral-content" htmlFor="email">
          <span className="label-text flex items-center gap-2"><Mail size={16} className="text-primary"/>Email Address</span>
        </label>
        <input
          id="email"
          type="email"
          className="input input-bordered bg-base-200 w-full"
          disabled
          {...register("email")}
        />
      </div>

      <div className="form-control md:col-span-2">
        <label className="label text-neutral-content" htmlFor="address">
          <span className="label-text flex items-center gap-2"><Home size={16} className="text-primary"/>Address</span>
        </label>
        <input
          id="address"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("address")}
        />
      </div>

      <div className="form-control md:col-span-2">
        <label className="label text-neutral-content" htmlFor="phone_number">
          <span className="label-text flex items-center gap-2"><Phone size={16} className="text-primary"/>Phone Number</span>
        </label>
        <input
          id="phone_number"
          type="text"
          className="input input-bordered bg-base-200 w-full focus:ring-primary focus:border-primary transition-all duration-200"
          disabled={!isEditing}
          {...register("phone_number")}
        />
      </div>
    </div>
  );
};

export default ProfileForm;
