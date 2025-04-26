export interface AuthState {
  accessToken: string | null
  tokenRefresh: string | null
}

export default function (): AuthState {
  return {
    accessToken: '',
    tokenRefresh: '',
  }
}
