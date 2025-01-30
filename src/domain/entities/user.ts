export class User {
  userId: string | number;
  userFirstName: string;
  SurName: string;
  UserEmail: string;
  token: string;
  role: string;
  
  constructor(userId: string | number, userFirstName: string, SurName: string, UserEmail: string, token: string, role: string) {
    this.userId = userId;
    this.userFirstName = userFirstName;
    this.SurName = SurName;
    this.UserEmail = UserEmail;
    this.token = token;
    this.role = role;
  }
  
  isAuthenticated(): boolean {
    return !!this.token;
  }
  
  getAuthorizationHeader(): string {
    return `Bearer ${this.token}`;
  }
  
  hasRole(role: string, userRoles: string[]): boolean {
    return userRoles.includes(role);
  }
}