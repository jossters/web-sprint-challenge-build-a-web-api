const express = require("express");
const Actions = require("./actions-model");

const { validateActionId, validateAction } = require("./middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

router.post("/", validateAction, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.json(newAction);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", validateActionId, validateAction, async (req, res, next) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.json(updatedAction);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch(next);
});

module.exports = router;
