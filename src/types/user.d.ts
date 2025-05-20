// src/types/user.d.ts

export type RoleType = 'admin' | 'user'

export interface User {
  id: string
  email: string
  roles: RoleType[]
  active: boolean
  createdAt: Date
}

export interface Admin {
  email: string
  password: string
  role: RoleType
}
