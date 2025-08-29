import { useForm } from "react-hook-form";
import ProfileForm from "../components/Dashboard/Profile/ProfileForm";
import { useEffect, useState } from "react";
import ProfileButtons from "../components/Dashboard/Profile/ProfileButtons";
import PasswordChangeForm from "../components/Dashboard/Profile/PasswordChangeForm";
import useAuthContext from "../hooks/useAuthContext";
import ErroAlert from "../components/ErroAlert";

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
      email: '', // Ensure email is in defaultValues
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
        email: user.email || '', // Ensure email is included here
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
      // IMPORTANT: Include all fields that your backend's UserSerializer might require for a PUT request,
      // even if they are disabled in the frontend (like email).
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email, // <--- THIS IS THE CRUCIAL ADDITION
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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="ml-2 text-neutral-content">Loading profile data...</p>
      </div>
    );
  }
  
  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {errorMsg && <ErroAlert error={errorMsg} />}
        <h2 className="card-title text-2xl mb-4 text-neutral">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
  );
};

export default Profile;
