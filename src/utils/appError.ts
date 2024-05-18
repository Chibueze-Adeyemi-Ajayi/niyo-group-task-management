// class appError extends the js inbuilt Error Class, this way we can get hold of our own error objects.
class AppError extends Error {
  statusCode: number;
  status: any
  isOperational!: boolean;
  constructor(message: any, statusCode: number) {
    super(message);

    this.statusCode = statusCode
    // return fail if it is a client-side (4xx) 404, 409... error and server-side (5xx) "error" if it is a server-side error
    this.status = `${statusCode}`.startsWith('4') ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError;