export interface RoleInfo {
  roleId: string | number;
  roleName: string;
}

export interface UserInfo {
  id: string | number;
  email: string;
  firstName: string;
  lastName: string;
  role: RoleInfo;
}

export interface TokenInfo {
  accessToken: string;
  expiresIn: string | number;
  tokenType: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  userInfo: UserInfo[]; 
  tokenInfo: TokenInfo[];
}

export abstract class AuthRepository {
    abstract signInWithEmailAndPassword(email: string, password: string): Promise<AuthResponse>
}