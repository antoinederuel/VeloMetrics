const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

// Route POST /api/auth/register
router.post(
    '/register',
    [
        body('email','Veuillez inclure un email valide').isEmail(),
        body('password', 'Le mot de passe doit contenir 6 caractères ou plus.').isLength({min : 6}),
    ],
    authController.register);

// Route POST /api/auth/login
router.post(
    '/login',
    [
      body('email', 'Veuillez inclure un email').not().isEmpty(),
        body('password', 'Mot de passe requis').not().isEmpty(),
    ],
    authController.login);

module.exports = router;