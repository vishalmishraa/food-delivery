// Desc: Error utility functions

export class ErrorHandler extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message); // Pass the message to the Error constructor
        this.statusCode = statusCode;
    }
}
