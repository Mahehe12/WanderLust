class ExpressError extends Error {
    constructor(statusCode, message) {
        super(); 
        // Calls the parent class constructor
        // It initializes the parent Error class.
        // This ensures the Error object (including its message and stack trace) is created properly.
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ExpressError;

// To create custom errors with additional properties (like status codes or custom messages).
// To pass errors to error-handling middleware in a consistent way.