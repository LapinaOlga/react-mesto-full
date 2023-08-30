const jwt = require('jsonwebtoken');
const ProtectedRouteError = require('../errors/ProtectedRouteError');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const matches = header.match(/^Bearer (.+)$/i);

  if (!matches) {
    next(new ProtectedRouteError());
    return;
  }

  const token = matches[1];
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(new ProtectedRouteError());
    return;
  }

  try {
    // Пользователь может быть удален, а JWT токен при этом будет активным.
    // Дополнительно проверяем этот кейс.
    const user = await User.findById(payload._id);

    if (!user) {
      next(new ProtectedRouteError());
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
