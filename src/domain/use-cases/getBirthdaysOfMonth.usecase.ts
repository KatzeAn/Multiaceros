import { BirthdaysService } from "@/services/birtdays.service";

export class GetBirthdaysOfMonthUseCase {
    constructor(private readonly birthdaysService: BirthdaysService) {}

    public static execute(): Promise<UserBirthdayList> {
        return BirthdaysService.getBirthdaysOfMonths();
    }
}