import { useForm } from "react-hook-form";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import { useEffect, useState } from "react";
import ProfileButtons from "../components/Dashboard/Profile/ProfileButtons";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";
import { UserCog } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);

  const { user, updateUserProfile, changePassword, errorMsg, loadingAuth } =
    useAuthContext();
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      phone_number: '',
      current_password: '',
      new_password: '',
      confirm_new_password: '',
    },
    mode: 'onSubmit', 
    reValidateMode: 'onChange',
  });

  // Populate form fields when user data loads or changes
  useEffect(() => {
    console.log("Profile Component: User data check. loadingAuth:", loadingAuth, "User:", user);
    if (!loadingAuth && user) {
      console.log("Profile Component: Resetting form with user data:", user);
      reset({
        first_name: user.first_name || '', 
        last_name: user.last_name || '',
        email: user.email || '',
        address: user.address || '',
        phone_number: user.phone_number || '',
      });
      clearErrors(); 
    } else if (!loadingAuth && !user) {
      console.log("Profile Component: Not logged in or user data failed to load. Resetting form to empty.");
      reset();
      clearErrors();
    }
  }, [user, loadingAuth, reset, clearErrors]); 

  // Effect to clear errors when switching out of editing mode
  useEffect(() => {
    if (!isEditing) {
      console.log("Profile Component: Exiting editing mode, clearing form errors.");
      clearErrors();
      setIsPasswordSectionOpen(false); 
    }
  }, [isEditing, clearErrors, setIsPasswordSectionOpen]);


  const onSubmit = async (data) => {
    console.log("Profile Component: Form submitted with data:", data);
    try {
      // 1. Profile update
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email, 
        address: data.address,
        phone_number: data.phone_number,
      };

      await updateUserProfile(profilePayload);

      // 2. Password Change - ONLY if section is open AND editing is enabled AND new passwords are provided
      if (isPasswordSectionOpen && isEditing && data.current_password && data.new_password) {
        if (data.new_password !== data.confirm_new_password) {
            console.error("Profile Component: New passwords do not match (should be caught by RHF validation).");
            return; 
        }
        await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
        setIsPasswordSectionOpen(false);
        setValue('current_password', '');
        setValue('new_password', '');
        setValue('confirm_new_password', '');
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Profile Component: Error during form submission:", error);
    }
  };

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-300"> {/* Added bg-base-300 */}
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-2 text-neutral-content">Loading profile data...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-base-300 py-10 flex items-center justify-center"> {/* Page background */}
      <div className="card w-full max-w-3xl mx-auto bg-base-100 shadow-2xl rounded-xl border border-base-200"> {/* Enhanced card styling */}
        <div className="card-body p-8"> {/* Increased padding */}
          {errorMsg && <ErroAlert error={errorMsg} />}
          <h2 className="card-title text-4xl font-extrabold text-white mb-6 flex items-center justify-center gap-3">
            <UserCog size={36} className="text-primary"/> {/* Icon for title */}
            Manage Your Profile
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> {/* Increased form spacing */}
            <ProfileForm
              register={register}
              errors={errors}
              isEditing={isEditing}
            />

            <PasswordChangeForm
              errors={errors}
              register={register}
              watch={watch}
              isEditing={isEditing}
              isPasswordSectionOpen={isPasswordSectionOpen}
              setIsPasswordSectionOpen={setIsPasswordSectionOpen}
            />

            <ProfileButtons
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isSubmitting={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
