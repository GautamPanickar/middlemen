/**
 * The base exception class.
 */
class HttpException extends Error {
    public status: number;
    public message: string;
    public error: any;

    public constructor(status: number, message: string, error?: any) {
        if (error) {
            super(error);
        } else {
            super(message);
        }
        this.status = status;
        this.message = message;
        this.error = error;
    }
}

export default HttpException;