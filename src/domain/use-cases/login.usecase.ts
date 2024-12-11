import { AuthService } from "@/services/auth.service";

export class LoginUseCase {
    constructor(private readonly authService: AuthService){}

    public static execute(email: string, password: string) {
        return AuthService.signInWithEmailAndPassword(email, password)
    }
}