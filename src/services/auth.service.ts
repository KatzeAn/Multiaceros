import { AuthModel } from "@/database/auth/auth.model";

export class AuthService {
    public static signInWithEmailAndPassword(email: string, password:string) {
        return new AuthModel().signInWithEmailAndPassword(email, password);
    }
}