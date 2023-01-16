const router = require('express').Router()
const AuthController = require('../controllers/authController')
const requireSign = require('../helpers/requireSign')
const adminAuth = require('../helpers/adminAuth')

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.login)
router.get('/secret', requireSign, adminAuth, AuthController.secret)

module.exports = router