// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Récupérer le token de l'en-tête (Header)
    // Nous allons chercher 'x-auth-token' que le frontend envoie
    const token = req.header('x-auth-token');

    // 2. Vérifier si le token existe
    if (!token) {
        // 401 Unauthorized (Non autorisé)
        return res.status(401).json({ msg: 'Accès refusé. Token manquant.' });
    }

    try {
        // 3. Vérifier la validité du token avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Attacher l'ID de l'utilisateur à l'objet de requête (req.userId)
        req.userId = decoded.userId;

        // 5. Passer au contrôleur suivant (la route protégée)
        next();

    } catch (err) {
        // Token non valide (expiré, falsifié)
        res.status(401).json({ msg: 'Token non valide.' });
    }
};