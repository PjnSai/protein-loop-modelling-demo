import React from "react";
import InputField from "../ui/InputField";

const ProfileInfoForm = ({ profileData, onChange, onSubmit, isSaving }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <form onSubmit={onSubmit} role="form">
          <InputField
            label="First Name"
            name="first_name"
            type="text"
            value={profileData.first_name || ""}
            onChange={onChange}
            disabled={isSaving}
          />
          <InputField
            label="Last Name"
            name="last_name"
            type="text"
            value={profileData.last_name || ""}
            onChange={onChange}
            disabled={isSaving}
          />
          <InputField
            label="Institution"
            name="institution"
            type="text"
            value={profileData.institution || ""}
            onChange={onChange}
            disabled={isSaving}
          />
          <InputField
            label="Bio"
            name="bio"
            type="text"
            value={profileData.bio || ""}
            onChange={onChange}
            disabled={isSaving}
          />
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
