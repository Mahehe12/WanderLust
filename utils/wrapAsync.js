module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next); // Catch errors and pass them to next()
    }
};
// To avoid writing try-catch everywhere, you can use a helper function to wrap your async routes
// Async errors happen when something goes wrong in asynchronous code (like promises, async/await, or callbacks). 