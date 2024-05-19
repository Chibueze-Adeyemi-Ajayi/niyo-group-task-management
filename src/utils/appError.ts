class AppError extends Error {
  result:object
  msg:string;
  statusCode: number;
  status: any
  isOperational!: boolean;
  constructor(message: any, statusCode: number) {
    super(message);
    this.msg = message;
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? "fail" : "error";
    this.isOperational = true;
    this.result = {}
  }
}

export default AppError;