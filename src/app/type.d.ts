declare global {
    class CustomError extends Error {
        code?: string;

        constructor(message: string, code: string) {
            super(message);
            this.code = code;
            Object.setPrototypeOf(this, CustomError.prototype); // Ensure instanceof works
        }
    }
}

export { }