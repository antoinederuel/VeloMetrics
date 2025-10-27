import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login'; // À créer
import Register from './pages/Register'; // Créé ci-dessus
import Dashboard from './pages/Dashboard'; // Page privée future

function App() {
    return (
        <Router>
            <nav>
                <Link to="/register">S'inscrire</Link> | <Link to="/login">Se connecter</Link> | <Link to="/dashboard">Dashboard</Link>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<h2>Accueil</h2>} />
            </Routes>
        </Router>
    );
}

export default App;