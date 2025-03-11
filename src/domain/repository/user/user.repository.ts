import type { User } from "@/domain/Interfaces/user/user.interface";

export abstract class UserRepository {
    abstract getUsers(): Promise<User[]>;
    abstract createUser(user: User): Promise<User>;
    abstract updateUser(user: User): Promise<User>;
    abstract deleteUser(id: string, modifiedBy: string): Promise<User>;
    abstract getBirthdaysOfMonth(): Promise<UserBirthdayList>;
    abstract heartbeat (userId: string): Promise<void>;
    abstract getUserCount (): Promise<number>;
}