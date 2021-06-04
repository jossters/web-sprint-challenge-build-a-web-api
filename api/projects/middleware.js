const Projects = require('./projects-model');

function validateProjectId(req, res, next) {
Projects.get(req.params.id)
.then(project => {
    if (!project) {
        res.status(404).json()
    } else {
        req.project = project
        next()
    }
})
.catch(next)
}

function validatePost(req, res, next) {
    const { name, description } = req.body
    if (!name || description) {
        next({
            status: 400,
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        next()
    }
}
module.exports = {
    validateProjectId,
    validatePost
}