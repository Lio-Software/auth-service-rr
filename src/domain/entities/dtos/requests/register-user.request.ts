export class RegisterUserRequest {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public phoneNumber: string;

    constructor(firstName: string, lastName: string, email: string, password: string, phoneNumber: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
    }
}
