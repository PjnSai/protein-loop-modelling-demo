import React from "react";
import InputField from "../ui/InputField";

const RequestResetForm = ({ email, onChange, onSubmit, isLoading, error }) => (
  <form onSubmit={onSubmit} role="form">
    <InputField
      label="Email Address"
      name="email"
      type="email"
      value={email}
      onChange={onChange}
      disabled={isLoading}
      placeholder="Enter your registered email"
    />
    {error && (
      <div className="alert alert-danger alert-dismissible" role="alert">
        <strong>Error:</strong> {error}
      </div>
    )}

    <div className="d-grid">
      <button
        type="submit"
        className="btn btn-primary btn-lg"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Sending...
          </>
        ) : (
          "Request Reset Link"
        )}
      </button>
    </div>
  </form>
);

export default RequestResetForm;
