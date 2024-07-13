export class AccessTokenPayload {
    public firstName: string;
    public lastName: string;
    public email: string;
    public phoneNumber: string;
    public imageUrl: string;
    public uuid: string;

    constructor(firstName: string, lastName: string, email: string, phoneNumber: string, imageUrl: string, uuid: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.imageUrl = imageUrl;
        this.uuid = uuid;
    }
}
