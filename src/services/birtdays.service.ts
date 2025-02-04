import { UserModel } from "@/database/user/user.model";

export class BirthdaysService {
    public static getBirthdaysOfMonths(): Promise<UserBirthdayList> {
        return new UserModel().getBirthdaysOfMonth();
    }
}