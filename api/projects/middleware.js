const Projects = require("./projects-model");

function validateProjectId(req, res, next) {
  Projects.get(req.params.id)
    .then((project) => {
      if (!project) {
        res.status(404).json();
      } else {
        req.project = project;
        next();
      }
    })
    .catch(next);
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res.status(400).json();
  } else {
    next();
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
