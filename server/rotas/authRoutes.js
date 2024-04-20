const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('./passaport-config');
const User = require('./models/modeluser');

const router = express.Router();

// Rota de login usando Passport.js
router.post('/login', passport.authenticate('local', { session: false }), async (req, res) => {
    try {
        console.log('Login bem-sucedido para o usuário:', req.user.id);
        // Adicione uma mensagem para indicar que o login foi bem-sucedido
        res.status(200).json({ success: true, message: 'Login bem-sucedido. Redirecionando para a página de imóveis...' });
        // Redirecione o usuário para a rota '/imoveis' após o login bem-sucedido
        res.redirect('http://localhost:3000/imoveis');
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).json({ message: 'Erro ao conectar ao servidor.' });
    }
});

module.exports = router;
