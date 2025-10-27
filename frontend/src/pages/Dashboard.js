import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fonction pour déconnecter l'utilisateur
    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprime le token
        navigate('/login'); // Redirige vers la page de connexion
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('token');

            // 1. Vérification initiale du Token
            if (!token) {
                // Si pas de token, rediriger immédiatement (Protection côté client)
                navigate('/login');
                setLoading(false);
                return;
            }

            try {
                // 2. Configuration des Headers pour l'envoi du Token JWT
                const config = {
                    headers: {
                        // Le middleware backend (auth.js) attend cet en-tête
                        'x-auth-token': token
                    }
                };

                // 3. Appel de la Route Protégée
                const response = await axios.get('http://localhost:5000/api/user/profile', config);

                // Si la requête réussit (statut 200), le backend a validé le token
                setUser(response.data);

            } catch (err) {
                // 4. Gestion de l'échec d'Authentification (Token invalide/expiré)
                // Le backend renvoie normalement un statut 401 ici

                localStorage.removeItem('token'); // Nettoyer le token invalide/expiré

                const errorMsg = err.response?.data?.msg || "Erreur de session. Veuillez vous reconnecter.";
                setError(errorMsg);

                // Rediriger après un court délai pour que l'utilisateur lise l'erreur
                setTimeout(() => navigate('/login'), 2500);

            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]); // Le hook se relance si 'navigate' change (rare, mais bonne pratique)

    // Affichage de chargement
    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 10 }}>
                <CircularProgress />
                <Typography variant="h6">Chargement de votre profil...</Typography>
            </Container>
        );
    }

    // Affichage principal
    return (
        <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
            <Box sx={{
                p: 4,
                boxShadow: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <AccountCircleIcon color="primary" sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h4" gutterBottom>
                    Tableau de Bord
                </Typography>

                {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                {user ? (
                    <Box sx={{ width: '100%', mt: 3 }}>
                        <Typography variant="h6" color="text.secondary">Vos informations :</Typography>
                        <Alert severity="success" sx={{ mt: 1 }}>
                            <Typography>Email: **{user.email}**</Typography>
                            <Typography variant="body2">ID Utilisateur: {user._id}</Typography>
                            <Typography variant="body2">Compte créé le: {new Date(user.date).toLocaleDateString()}</Typography>
                        </Alert>
                    </Box>
                ) : (
                    // Affichage si le chargement a échoué (et l'utilisateur n'a pas encore été redirigé)
                    <Typography variant="body1" color="error">
                        Accès non autorisé. Redirection en cours...
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{ mt: 4 }}
                >
                    Déconnexion
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;