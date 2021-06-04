const express = require("express");
const Projects = require("./projects-model");

const { validateProjectId, validateProject } = require("./middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateProjectId,
  validateProject,
  async (req, res, next) => {
    try {
      const updatedProject = await Projects.update(req.params.id, req.body);
      res.json(updatedProject);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => res.json(actions))
    .catch(next);
});

module.exports = router;
