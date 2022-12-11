const router = require('express').Router();
const itensController = require('../controller/itensController');

// const verifyToken = require('../helpers/verify-token');

router.get('/analytics/:id', itensController.analises);
router.get('/shipping/:id', itensController.shipping);

module.exports = router;