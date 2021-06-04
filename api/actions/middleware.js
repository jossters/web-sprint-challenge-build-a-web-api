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

function validatePost(req, res, next) {
    const { project_id, description, notes } = req.body
    if (!project_id || description || notes) {
        next({
            status: 400,
        })
    } else {
        req.project_id = project_id.trim()
        req.description = description.trim()
        req.notes = notes.trim()
        next()
    }
}
module.exports = {
    validateActionId,
    validatePost
}