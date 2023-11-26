const { getHomePage, getDetailPage } = require('../controller/homeController.js')
const express = require('express');
const router = express.Router();
router.get('/', getHomePage);
router.get('/detail/:id', getDetailPage);
module.exports = router;
