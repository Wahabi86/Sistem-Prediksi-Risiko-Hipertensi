import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface ApiErrorResponse {
  msg?: string;
}

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      const data = response.data;
      localStorage.setItem("token", data.access_token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      router.push("/beranda");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      setError(axiosError.response?.data?.msg || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, gender: string, email: string, password: string) => {
    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_URL}/api/auth/register`, {
        nama_lengkap: name,
        jenis_kelamin: gender,
        email,
        password,
      });

      router.push("/auth/login");
    } catch (err: unknown) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      setError(axiosError.response?.data?.msg || "Registrasi gagal");
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error };
}
