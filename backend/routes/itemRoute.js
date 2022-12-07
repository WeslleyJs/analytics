const router = require('express').Router();
const itensController = require('../controller/itensController');

const verifyToken = require('../helpers/verify-token');

router.get('/analytics/:id', verifyToken, itensController.analises);

module.exports = router;
