const Action = require('./actions-model');

function validateActionId(req, res, next) {
Action.get(req.params.id)
.then(action => {
    if (!action) {
        res.status(404).json()
    } else {
        req.action = action
        next()
    }
})
.catch(next)
}

module.exports = {
    validateActionId
}