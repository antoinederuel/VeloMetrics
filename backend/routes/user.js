// backend/routes/user.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Import du middleware
const User = require('../models/User'); // Import du modèle utilisateur

// @route   GET /api/user/profile
// @desc    Récupérer les données de l'utilisateur connecté (PRIVÉE)
// @access  Private (requiert le middleware 'auth')
router.get('/profile', auth, async (req, res) => {
    try {
        // Grâce au middleware 'auth', req.userId contient l'ID du token
        // On récupère les infos utilisateur sans le mot de passe
        const user = await User.findById(req.userId).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'Utilisateur non trouvé.' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur');
    }
});

module.exports = router;