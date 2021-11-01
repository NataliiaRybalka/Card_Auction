export class ErrorHandler extends Error{
    constructor(status, message) {
        super();

        this.status = status;
        this.message = message;

        Error.captureStackTrace(this, this.constructor);
    }
}
