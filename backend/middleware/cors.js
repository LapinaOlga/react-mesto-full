const allowedCors = (process.env.ALLOWED_ORIGINS || '').split(',');

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  if (process.env.NODE_ENV !== 'production' || allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Origin', '*');

    const { method } = req;

    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);

      return res.end();
    }
  }

  next();
  return null;
};
