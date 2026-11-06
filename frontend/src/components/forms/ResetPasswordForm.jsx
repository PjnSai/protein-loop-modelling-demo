import React from "react";
import InputField from "../ui/InputField";

export default function ResetPasswordForm({
  formData,
  onChange,
  onSubmit,
  isLoading,
  error,
}) {
  return (
    <form onSubmit={onSubmit}>
      <InputField
        label="New Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={onChange}
        disabled={isLoading}
        placeholder="Enter new password"
      />
      <div className="form-text mb-3">
        Password must be at least 8 characters and should not be found in data
        breaches.
      </div>
      <InputField
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={onChange}
        disabled={isLoading}
        placeholder="Confirm new password"
      />
      {error && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="d-grid mt-4">
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
}
