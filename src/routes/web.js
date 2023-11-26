const { getHomePage, getDetailPage, postSearchPage, getSearchPage } = require('../controller/homeController.js')
const express = require('express');
const router = express.Router();
router.get('/', getHomePage);
router.get('/detail/:id', getDetailPage);
router.post('/search/:page', postSearchPage);
module.exports = router;
