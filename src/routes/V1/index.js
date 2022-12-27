const express = require('express')

const userController = require('../../controllers/user-controller');  
const {AuthRequestValidator} = require('../../middlewares/index');  
const router = express.Router();

router.post(
    '/signup',
    AuthRequestValidator.validateUserAuth,
    userController.create
);
router.post(
    '/signIn',
    AuthRequestValidator.validateUserAuth, userController.signIn
);

router.get(
    '/isAuthenticated',
    userController.isAuthenticated
)

module.exports = router;