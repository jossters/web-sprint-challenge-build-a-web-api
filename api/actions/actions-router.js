const express = require('express');
const Actions = require('./actions-model');

const { validateActionId, validatePost } = require('./middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
Actions.get(req.params)
.then(actions => {
    res.status(200).json(actions);
})
.catch(next);
});

router.get('/:id', validateActionId,(req, res) => {
    res.json(req.query)
});

router.post('/', validatePost,(req, res, next) => {
Actions.insert(req.params.id, 
    {project_id: req.project_id, 
    description: req.description, 
    notes:req.notes})
    .then(()=> {
        return Actions.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
});

router.put('/:id', validateActionId, validatePost, (req, res, next) => {
Actions.update(req.params.id, 
    {project_id: req.project_id, 
    description: req.description, 
    notes:req.notes})
    .then(()=> {
        return Actions.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
});

router.delete('/:id', validateActionId, (req, res, next) => {
Actions.remove(req.params.id)
.then(() => {
    res.status(200).json(req.user);
})
.catch(next);
});

module.exports = router;