 
 
import { axiosInstance } from 'src/boot/axios';
import { API_ESOURECES } from './api_resources';

export interface Account {
  ci: string;
  email: string;
  name: string;
  objectClass: string;
  position: string;
  careerName: string;
  salary: string;
  subArea: string;
  subCategory: string;
  serviceTime: string;
  vacations: string;
  activeYears: string;
  militancy: string;
  curseType: string;
  hasInternet: boolean;
  hasCloud: boolean;
  hasEmail: boolean;
  hasVPN: boolean;
  hasVc: boolean;
  alreadySignIn: boolean;
}

export interface UserAccounts {
  accountsDetails?: Account[];
  inSystem: boolean;
}

export interface ServicesInput {
  hasEmail?: boolean;
  hasInternet?: boolean;
  hasVideoConference?: boolean;
  hasCloud?: boolean;
}

export const UserService = {
  getUserInfo: async function(key: string, value: string) {
    const response = await axiosInstance.get<UserAccounts>(
      API_ESOURECES.INSPECT_USER,
      {
        params: {
          [key]: value
        }
      }
    );
    return response.data;
  },

  resetUser: async function(id: string, email: string) {
    await axiosInstance.post(API_ESOURECES.RESET_USER, { ci: id, email });
  },

  changePass: async function(email: string, newPassword: string) {
    await axiosInstance.post(API_ESOURECES.CHANGE_USER_PASS, {
      email,
      newPassword
    });
  },

  changeServices: async function(email: string, input: ServicesInput) {
    return axiosInstance.patch(
      `${API_ESOURECES.SERVICES_EDIT}?email=${email}`,
      input
    );
  },
  blockUser: async function(email: string, comment: string) {
    return axiosInstance.post(`${API_ESOURECES.BLOCK_USER}`, {
      email,
      comment
    });
  },
  unblockUser: async function(email: string) {
    return axiosInstance.post(`${API_ESOURECES.UNBLOCK_USER}?email=${email}`, {
      email
    });
  }
};
