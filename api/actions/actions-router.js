const express = require('express');
// const Actions = require('./actions-model');

// const { validateActionId } = require('./middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
console.log('hi')
});

module.exports = router;