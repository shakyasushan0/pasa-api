const authenticate = (req, res, next) => {
  if (req.session.user) next();
  else {
    res.status(403).json({
      message: "You are not authenticated",
    });
  }
};
module.exports = authenticate;
