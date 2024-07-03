export class VerifyTokenResponse {
    public valid: boolean;
    public userId: string;
    public email: string;

    constructor(valid: boolean, userId: string, email: string) {
        this.valid = valid;
        this.userId = userId;
        this.email = email;
    }
}
