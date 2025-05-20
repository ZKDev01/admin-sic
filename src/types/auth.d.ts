export interface RegistrationData {
  email: string
  password: string
  passwordConfirmation: string
  role: string
}

export interface AuthUser {
  id: string
  email: string
  roles: string[]
  createdAt: string
}

export interface ApiError {
  message: string
  code: string
  errors?: {
    field: string
    message: string
  }[]
}

export interface AuthResponse {
  user: AuthUser
  token: string
  refreshToken: string
  availableRoles?: string[]
}

export interface NewUser {
  email: string
  password: string
  passwordConfirmation: string
  role: RoleType
}
