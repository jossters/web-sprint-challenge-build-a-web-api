const express = require('express');
const Projects = require('./projects-model');

const { 
    validateProjectId,
    validatePost} = require('./middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Projects.get(req.params)
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(next);
    });
    
    router.get('/:id', validateProjectId,(req, res) => {
        res.json(req.query)
    });
    
    router.post('/', validatePost,(req, res, next) => {
    Projects.insert(req.params.id, 
        {name: req.name, 
        description: req.description, })
        .then(()=> {
            return Projects.get(req.params.id)
        })
        .then(action => {
            res.json(action)
        })
        .catch(next)
    });
    
    router.put('/:id', validateProjectId, validatePost, (req, res, next) => {
    Projects.update(req.params.id, 
        {name: req.name, 
        description: req.description,})
        .then(()=> {
            return Projects.get(req.params.id)
        })
        .then(action => {
            res.json(action)
        })
        .catch(next)
    });
    
    router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
    .then(() => {
        res.status(200).json(req.user);
    })
    .catch(next);
    });

module.exports = router;