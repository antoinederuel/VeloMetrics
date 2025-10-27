import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// NOUVEL IMPORT
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            {/* Intégration de la Navbar avant les routes */}
            <Navbar />

            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={
                    <div style={{ padding: '20px' }}>
                        <h2>Bienvenue !</h2>
                        <p>Veuillez vous inscrire ou vous connecter pour accéder au dashboard.</p>
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;