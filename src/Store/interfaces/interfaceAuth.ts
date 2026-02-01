export interface LoginCredentials {
  email: string;
  password: string;
}

export interface registerCredentials {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  role?: string;
}
export interface LoginError {
  message: string;
  error?: string;
  statusCode?: number;
}

export interface LoginResponse {
  sub: string;
  token: string;
}
