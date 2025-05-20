import { axiosInstance } from 'src/boot/axios'
import { API_ESOURECES } from './api_resources'

export interface LoginResponse {
  token: string
  tokenRefresh: string
  user: {
    id: string
    roles: string[]
  }
}
export interface LoginRequest {
  user: string
  password: string
}
export interface RegistrationRequest {
  email: string
  password: string
  passwordConfirmation: string
  role: string
}

export const ACCESS_TOKEN = 'access-token'
export const REFRESH_TOKEN = 'refresh-token'

export const AuthService = {
  login: async function (data: LoginRequest) {
    const response = await axiosInstance.post<LoginResponse>(API_ESOURECES.LOGIN, data)
    return response.data
  },

  register: async function (data: RegistrationRequest): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>(API_ESOURECES.REGISTER, data)
    return response.data
  },

  setTokens: function (token: string | null, tokenRefresh: string | null): void {
    if (token && tokenRefresh) {
      localStorage.setItem(ACCESS_TOKEN, token)
      localStorage.setItem(REFRESH_TOKEN, tokenRefresh)
    }
  },

  getAccessToken: function (): string {
    return localStorage.getItem(ACCESS_TOKEN) || ''
  },

  gettokenRefresh: function (): string {
    return localStorage.getItem(REFRESH_TOKEN) || ''
  },

  setTookens: function (token: string, tokenRefresh: string): void {
    localStorage.setItem(ACCESS_TOKEN, token)
    localStorage.setItem(REFRESH_TOKEN, tokenRefresh)
  },

  removeTokens: function (): void {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
  },
}
