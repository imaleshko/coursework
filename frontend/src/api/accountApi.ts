import { api, setAccessToken } from "@/api/api.ts";

export interface ChangeEmailRequest {
  email: string;
}

export interface ChangeEmailResponse {
  user: User;
  accessToken: string;
}

export interface ChangeUsernameRequest {
  username: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export const accountApi = {
  getUser: async (): Promise<User> => {
    const response = await api.get<User>("/account/user");
    return response.data;
  },

  changeEmail: async (email: ChangeEmailRequest): Promise<User> => {
    const response = await api.patch<ChangeEmailResponse>(
      "/account/email",
      email,
    );
    setAccessToken(response.data.accessToken);
    return response.data.user;
  },

  changeUsername: async (username: ChangeUsernameRequest): Promise<User> => {
    const response = await api.patch<User>("/account/username", username);
    return response.data;
  },

  changePassword: async (password: ChangePasswordRequest): Promise<void> => {
    await api.patch<void>("/account/password", password);
  },
};
