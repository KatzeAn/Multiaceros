import type { ApiErrorResponse } from "@/domain/Interfaces/ApiErrorResponse.interface";
import {
  AuthRepository,
  type AuthResponse,
} from "@/domain/repository/auth/auth.repository";

import axios from "axios";

export class AuthModel extends AuthRepository {
  private apiUrl = "https://localhost:51655/api/Auth/login";

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(
        this.apiUrl,
        { UserEmail: email, Password: password },
        { headers: { "Content-Type": "application/json" } }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data as ApiErrorResponse;

        // Extraemos mensaje de error o damos un fallback
        const errorMessage =
          apiError?.error?.details || "Error en la autenticación";

        throw new Error(errorMessage);
      } else {
        throw new Error("Error inesperado en la autenticación");
      }
    }
  }
}
