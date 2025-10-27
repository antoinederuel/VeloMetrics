const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// LOGIQUE D'INSCRIPTION (REGISTER)
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Renvoie une erreur 400 avec les messages d'erreurs formatés
        return res.status(400).json({
            msg: errors.array()[0].msg // On renvoie le premier message d'erreur pour simplifier
        });
    }

    const { email, password } = req.body;

    try {
        // 2. Logique métier existante (Vérifier si l'utilisateur existe déjà)
        let user = await User.findOne({ email });
        // ... (le reste de la logique 'register' reste inchangée)
        if (user) {
            return res.status(400).json({ msg: 'Cet email est déjà enregistré.' });
        }

        // 2. Créer une nouvelle instance d'utilisateur
        user = new User({ email, password });

        // 3. HACHAGE du Mot de Passe avec Bcrypt
        const salt = await bcrypt.genSalt(10); // Génère un "sel" (salt)
        user.password = await bcrypt.hash(password, salt); // Hache le mot de passe

        // 4. Sauvegarder dans MongoDB
        await user.save();

        // 5. Création du Token JWT pour l'authentification immédiate
        const payload = { userId: user.id };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Le token expire après 1 heure
        );

        res.json({ token, msg: 'Inscription réussie.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur');
    }
};

// LOGIQUE DE CONNEXION (LOGIN)
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Pour des raisons de sécurité, nous donnons un message générique pour le login
        return res.status(400).json({
            msg: 'Identifiants invalides.'
        });
    }
    const { email, password } = req.body;

    try {
        // 1. Vérifier si l'utilisateur existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Identifiants invalides.' });
        }

        // 2. Comparer le mot de passe avec Bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Identifiants invalides.' });
        }

        // 3. Création du Token JWT
        const payload = { userId: user.id };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, msg: 'Connexion réussie.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur Serveur');
    }
};