import axiosInstance from "@/lib/axios";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await axiosInstance.post('/api/auth', credentials);
  return response.data;
}