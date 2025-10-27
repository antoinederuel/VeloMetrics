import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Navbar = () => {
    // Vérifie si un token est présent dans localStorage (statut de connexion)
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Liens à afficher si l'utilisateur est DÉCONNECTÉ
    const publicLinks = (
        <Box>
            <Button color="inherit" component={Link} to="/register" startIcon={<PersonAddIcon />}>
                S'inscrire
            </Button>
            <Button color="inherit" component={Link} to="/login" startIcon={<VpnKeyIcon />}>
                Se connecter
            </Button>
        </Box>
    );

    // Liens à afficher si l'utilisateur est CONNECTÉ
    const privateLinks = (
        <Box>
            <Avatar {...stringAvatar('Kent Dodds')} />
            <Button color="inherit" component={Link} to="/dashboard" startIcon={<DashboardIcon />}>
                Dashboard
            </Button>
            <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                Déconnexion
            </Button>
        </Box>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Nom de l'Application ou Logo */}
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    VeloMetrics App
                </Typography>

                {/* Affichage des liens en fonction du statut de connexion */}
                {isAuthenticated ? privateLinks : publicLinks}
            </Toolbar>
        </AppBar>
    );
};

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export default Navbar;