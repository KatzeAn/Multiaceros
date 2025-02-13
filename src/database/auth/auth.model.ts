import type { ApiErrorResponse } from "@/domain/Interfaces/ApiErrorResponse.interface";
import {
  AuthRepository,
  type AuthResponse,
} from "@/domain/repository/auth/auth.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

import axios from "axios";

export class AuthModel extends AuthRepository {
  confirmPasswordReset(token: string, newPassword: string): Promise<string> {
    return apiRequest("post", "/Auth/password-reset", {
      token: token,
      newPassword: newPassword,
    });
  }
  resetPassword(email: string): Promise<string> {
    return apiRequest("post", "/Auth/forgot-password", { UserEmail: email });
  }
  private apiUrl = "https://localhost:53793/api/Auth/login";

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
        console.error("Error capturado en Axios:", error.response?.data); 
        const errorResponse = error.response?.data;
  
        let errorMessage = "Error en la autenticación"; 
  
        if (errorResponse) {
          if (errorResponse.errors?.ValidationError?.length) {
            errorMessage = errorResponse.errors.ValidationError[0]; 
          } 
        }
  
        throw new Error(errorMessage);
      } else {
        console.error("Unexpected error:", error);
        throw new Error("Error inesperado en la autenticación");
      }
    }
  }
}  
