require('dotenv').config(); // Charge les variables du fichier .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Autorise les requêtes du frontend (React)
app.use(express.json()); // Permet de lire les données JSON envoyées dans le corps des requêtes

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion MongoDB :', err));

// Importation des Routes d'Authentification
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Toutes les routes d'auth commencent par /api/auth

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});