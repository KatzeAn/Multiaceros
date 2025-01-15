import { AuthRepository, type AuthResponse } from "@/domain/repository/auth/auth.repository";

import axios from 'axios';

export class AuthModel extends AuthRepository {

    private apiUrl = "https://localhost:59372/api/User/ValidateUserOrEmployee";

    async signInWithEmailAndPassword(email: string, password: string): Promise<AuthResponse> {
        try {
          const response = await axios.post<AuthResponse>(
            this.apiUrl,
            {
              UserEmail: email,
              Password: password
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
      
          return response.data;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const customError = error.response?.data as AuthResponse;
      
            throw new Error(customError.message || 'Error en la autenticación');
          } else {
            console.error('Unexpected error:', error);
            throw new Error('Error inesperado en la autenticación');
          }
        }
      }

    saveToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getToken(): string | null{
        return localStorage.getItem('token');
    }

    clearToken(): void {
        localStorage.removeItem('token');
    }
}