const Action = require("./actions-model");

function validateActionId(req, res, next) {
  Action.get(req.params.id)
    .then((action) => {
      if (!action) {
        res.status(404).json();
      } else {
        req.action = action;
        next();
      }
    })
    .catch(next);
}

function validateAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res.status(400).json();
  } else {
    next();
  }
}

module.exports = {
  validateActionId,
  validateAction,
};
