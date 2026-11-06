/* The static demo has no backend. This client keeps the same interface as the
   real one on main, but answers from browser-only demo state. There are no
   real accounts: the only way in is "Continue as demo user", and no password
   is ever sent anywhere. */

import { demoStore } from "../demo/demoStore";
import { DEMO_USER, SAMPLE_PROFILE } from "../demo/sampleData";

const DEMO_ONLY_MESSAGE =
  "This is a static demo, so real accounts are turned off. Use 'Continue as demo user' to explore with sample data.";

// Small delay so loading states still show, as with a real network call
const respond = (ok, data, status = ok ? 200 : 400) =>
  new Promise((resolve) => setTimeout(() => resolve({ ok, data, status }), 150));

const notInDemo = () => respond(false, { error: DEMO_ONLY_MESSAGE }, 403);

const requireDemoSession = (handler) => () =>
  demoStore.get().signedIn
    ? handler()
    : respond(false, { error: "Not signed in" }, 401);

class ApiClient {
  async signInAsDemo() {
    demoStore.set({ signedIn: true });
    return respond(true, { user: DEMO_USER });
  }

  async login() {
    return notInDemo();
  }

  async register() {
    return notInDemo();
  }

  async verifyOTP() {
    return notInDemo();
  }

  async resendOTP() {
    return notInDemo();
  }

  async requestPasswordReset() {
    return notInDemo();
  }

  async resetPassword() {
    return notInDemo();
  }

  async changePassword() {
    return respond(
      false,
      { error: "Password changes are turned off in the demo account." },
      403,
    );
  }

  async logout() {
    demoStore.reset();
    return respond(true, { message: "Logged out" });
  }

  getProfile = requireDemoSession(() =>
    respond(true, { ...SAMPLE_PROFILE, ...(demoStore.get().profile || {}) }),
  );

  async updateProfile(profileData) {
    if (!demoStore.get().signedIn) {
      return respond(false, { error: "Not signed in" }, 401);
    }
    // The email address is fixed for the demo account
    const { first_name, last_name, institution, bio } = profileData;
    demoStore.set({ profile: { first_name, last_name, institution, bio } });
    return respond(true, { message: "Profile updated (this session only)" });
  }

  checkAuthStatus = requireDemoSession(() => respond(true, DEMO_USER));
}

const apiClient = new ApiClient();
export default apiClient;

export const authAPI = {
  login: (data) => apiClient.login(data),
  register: (data) => apiClient.register(data),
  verifyOTP: (email, otp) => apiClient.verifyOTP(email, otp),
  resendOTP: (email) => apiClient.resendOTP(email),
  requestPasswordReset: (email) => apiClient.requestPasswordReset(email),
  resetPassword: (email, token, password) =>
    apiClient.resetPassword(email, token, password),
  changePassword: (data) => apiClient.changePassword(data),
};

export const userAPI = {
  getProfile: () => apiClient.getProfile(),
  updateProfile: (data) => apiClient.updateProfile(data),
};
