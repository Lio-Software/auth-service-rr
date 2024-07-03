export class AuthUserResponse {
    public accessToken: string;
    public refreshToken: string;

    constructor(token: string, refreshToken: string) {
        this.accessToken = token;
        this.refreshToken = refreshToken;
    }
}
