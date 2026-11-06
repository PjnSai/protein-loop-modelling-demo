import React from "react";
import InputField from "../ui/InputField";

const ChangePasswordForm = ({
  passwordData,
  onChange,
  onSubmit,
  isSaving,
  onCancel,
}) => (
  <form onSubmit={onSubmit} className="border rounded p-3">
    <InputField
      label="Current Password"
      name="current_password"
      type="password"
      value={passwordData.current_password}
      onChange={onChange}
      disabled={isSaving}
    />
    <InputField
      label="New Password"
      name="new_password"
      type="password"
      value={passwordData.new_password}
      onChange={onChange}
      disabled={isSaving}
    />
    <InputField
      label="Confirm New Password"
      name="confirm_password"
      type="password"
      value={passwordData.confirm_password}
      onChange={onChange}
      disabled={isSaving}
    />
    <div className="d-flex gap-2">
      <button type="submit" className="btn btn-primary" disabled={isSaving}>
        {isSaving ? "Updating..." : "Update Password"}
      </button>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onCancel}
      >
        Cancel
      </button>
    </div>
  </form>
);

export default ChangePasswordForm;
