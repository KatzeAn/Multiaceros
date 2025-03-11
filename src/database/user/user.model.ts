import type { User } from "@/domain/Interfaces/user/user.interface";
import { UserRepository } from "@/domain/repository/user/user.repository";
import { apiRequest } from "@/presentation/api/axiosInstance";

export class UserModel extends UserRepository {
  getUsers(): Promise<User[]> {
    return apiRequest<User[]>("get", "/User/GetAllUser");
  }
  createUser(user: User): Promise<User> {
    return apiRequest<User>("post", "/User/CreateUser", { user });
  }
  updateUser(user: User): Promise<User> {
    return apiRequest<User>("put", "/User/UpdateUser", { user });
  }
  deleteUser(id: string, modifiedBy: string): Promise<User> {
    return apiRequest<User>("patch", `/User/${id}/UserDelete`, { modifiedBy });
  }
  async getBirthdaysOfMonth(): Promise<UserBirthdayList> {
    return apiRequest<UserBirthdayList>("get", "/User/GetBirthdays");
  }
  heartbeat(userId: string): Promise<void> {
    return apiRequest<void>("post", "/User/heartbeat",  {userId});
}
  getUserCount(): Promise<number> {
    return apiRequest<number>("get", "/User/count");
  }
}
