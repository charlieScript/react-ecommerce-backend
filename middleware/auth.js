const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // check in the req header for token
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization failed' });
  }

  try {
    // verify token
    const decoded = jwt.verify(token, 'charliescript');

    // add user from payload in the token - the user is gotten from the token
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
