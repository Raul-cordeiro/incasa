// Importações necessárias
const express = require('express');
const router = express.Router();
const User = require('./models/modeluser');
const bcrypt = require('bcryptjs');

// Rota para lidar com a solicitação de login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Recebido pedido de login:', { email, password });

        // Busca o usuário pelo email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('Usuário não encontrado para o email:', email);
            return res.status(401).json({ message: 'Email ou senha incorretos.' });
        }

        // Compara a senha fornecida com a senha armazenada no banco de dados
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            console.log('Login bem-sucedido para o usuário:', user.id);
            return res.status(200).json({ success: true });
        } else {
            console.log('Senha incorreta para o usuário:', user.id);
            return res.status(401).json({ message: 'Email ou senha incorretos.' });
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ message: 'Erro ao conectar ao servidor.' });
    }
});

module.exports = router;
