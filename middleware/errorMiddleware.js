function errorMiddleware(err, req, res, next) {
  let message = err.message || "something went wwrong";

  return res.status(err.statusCode || 500).json({
    success: false,
    message,
    stack: err.stack,
  });
}

export default errorMiddleware;
