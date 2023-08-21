const jwt = require("jsonwebtoken");

const jwtMiddleware = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid !");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("Your are not authenticated !");
    }
  },

  verifyTokenAndAdmin: (req, res, next) => {
    jwtMiddleware.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("Your are not authenticated or admin !");
      }
    });
  },
};

module.exports = jwtMiddleware;