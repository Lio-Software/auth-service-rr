export class BaseResponse {
    public data: Object;
    public message: string;

    constructor(data: Object, message: string) {
        this.data = data;
        this.message = message;
    }
}
