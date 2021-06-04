const express = require('express');
// const Pojects = require('./projects-model');

// const { validateActionId } = require('./middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
console.log('hi')
});

module.exports = router;