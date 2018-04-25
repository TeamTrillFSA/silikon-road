/* SERVER SIDE */

const checkConditionMiddleware = (conditionFuncs) => (req, res, next) => {
  const finalCondition = conditionFuncs.every(conditionFunc => conditionFunc(req));

  if (finalCondition) {
    next();
  } else {
    res.sendStatus(401);
  }
};

const adminConditionFunc = (req) => req.user && req.user.isAdmin;


module.exports = {
  checkConditionMiddleware,
  adminConditionFunc,
};
