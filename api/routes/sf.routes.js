/**
 * Created by simondemertzis on 3/10/18.
 */
const express = require('express');
const router = express.Router();
const appRoot = require('app-root-path');
const sfCtr = require('../controllers/sf.controller');

router
    .route('/login')
    .post(sfCtr.loginStandard);

router
    .route('/caseupdate')
    .put(sfCtr.getAndUpdateCase)

module.exports = router;