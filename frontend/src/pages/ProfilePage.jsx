import { useEffect, useState } from "react";

import { getProfile, updateProfile } from "../api/user";

import UserInfoCard from "../components/widgets/UserInfoCard";
import ProfileInfoForm from "../components/forms/ProfileInfoForm";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    institution: "",
    bio: "",
    email: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedMessage, setSavedMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { ok, data } = await getProfile();
        if (ok) {
          setProfile(data);
        } else {
          setError(data?.error || "Failed to load profile.");
        }
      } catch {
        setError("Network error. Please try again.");
      }
    };
    fetchProfile();
  }, []);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { ok, data } = await updateProfile(profile);
      if (!ok) {
        setError(data?.error || "Failed to update profile.");
      } else {
        setError(null);
        setSavedMessage(data?.message || "Profile updated");
      }
    } catch {
      setError("Error updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile Settings</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      {savedMessage && (
        <div className="alert alert-success" role="status">
          {savedMessage}
        </div>
      )}

      <UserInfoCard email={profile.email} />
      <ProfileInfoForm
        profileData={profile}
        onChange={(e) =>
          setProfile({ ...profile, [e.target.name]: e.target.value })
        }
        onSubmit={updateProfileHandler}
        isSaving={isSaving}
      />
      <h4 className="mt-4">Change Password</h4>
      <div className="alert alert-light border small">
        Password changes are turned off for the demo account. In the full
        version, users confirm their current password and choose a new one
        of at least 8 characters.
      </div>
    </div>
  );
};

export default ProfilePage;
