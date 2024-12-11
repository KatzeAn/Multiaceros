import { UserModel } from "@/database/auth/user.model";

export class BirthdaysService {
    public static getBirthdaysOfMonths(): Promise<UserBirthdayList> {
        return new UserModel().getBirthdaysOfMonth();
    }
}