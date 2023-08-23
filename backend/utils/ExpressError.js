// custom error, then pass it to error handling route (app.use((err, req, res, next)) in index.js, then pass it to client as error object with message (in json)
class ExpressError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
module.exports = ExpressError;
