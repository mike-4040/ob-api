export const handleError = (err, res, next) => {
  const { statusCode, message } = err;
  res.status(500).json({
    status: 'error',
    statusCode,
    message,
  });
  next();
};
