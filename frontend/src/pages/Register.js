import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// Importations de Material UI
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen'; // Exemple d'icône

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });

            localStorage.setItem('token', response.data.token);
            setMessage(response.data.msg || 'Inscription réussie !');
            // Le statut n'est pas une erreur, donc isError reste false

            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Échec de l\'inscription. Veuillez réessayer.';
            setMessage(errorMsg);
            setIsError(true); // Définir l'état d'erreur
            console.error(error);
        }
    };

    return (
        // Container centre le contenu et lui donne une largeur maximale
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    boxShadow: 3, // Ombre pour l'effet de carte
                    borderRadius: 2
                }}
            >
                {/* Icône et Titre */}
                <LockOpenIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
                    S'inscrire
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    {/* Champ Email */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth // Prend toute la largeur disponible
                        id="email"
                        label="Adresse Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Champ Mot de Passe */}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Mot de passe"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* Bouton de Soumission */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained" // Bouton rempli (primaire)
                        sx={{ mt: 3, mb: 2 }}
                    >
                        S'inscrire
                    </Button>
                </Box>

                {/* Affichage du Message */}
                {message && (
                    // Utilisation du composant Alert pour un message stylisé
                    <Alert severity={isError ? "error" : "success"} sx={{ width: '100%', mt: 2 }}>
                        {message}
                    </Alert>
                )}

                {/* Lien vers la page de connexion */}
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Déjà un compte ? <Link to="/login">Se connecter ici</Link>
                </Typography>

            </Box>
        </Container>
    );
};

export default Register;