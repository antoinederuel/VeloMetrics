import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Réinitialiser le message précédent

        try {
            // Requête POST vers l'endpoint de connexion du backend
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            // Si la connexion réussit, le backend renvoie un token JWT
            const token = response.data.token;

            // 1. Stocker le token dans le localStorage pour maintenir la session
            localStorage.setItem('token', token);

            setMessage('Connexion réussie ! Redirection vers le tableau de bord...');

            // 2. Rediriger l'utilisateur après 1.5 seconde
            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (error) {
            // Si la connexion échoue (ex: identifiants invalides)
            const errorMsg = error.response?.data?.msg || 'Échec de la connexion. Veuillez réessayer.';
            setMessage(errorMsg);
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Se Connecter
                </button>
            </form>

            {/* Affichage du message de succès ou d'erreur */}
            {message && (
                <p style={{
                    marginTop: '20px',
                    color: message.includes('réussie') ? 'green' : 'red',
                    fontWeight: 'bold'
                }}>
                    {message}
                </p>
            )}

            <p style={{ marginTop: '20px' }}>
                Pas encore de compte ? <Link to="/register">S'inscrire ici</Link>
            </p>
        </div>
    );
};

export default Login;