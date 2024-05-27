const express = require('express');
const router = express.Router();
const User = require('../models/modeluser');
const { upload } = require('./multerconfig');
const bcrypt = require('bcryptjs');

router.post('/user', upload.single('file'), async (req, res) => {
  try {
    const { username, email, password, phone, address, city, age, civilStatus } = req.body;
    
    // Verificar se há um arquivo enviado
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    // Gerar um hash seguro da senha
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        console.error('Erro ao gerar hash:', err);
        return res.status(500).json({ error: 'Erro ao criar usuário' });
      }

      try {
        const imageUrl = req.file.path.replace('uploads', './uploads');

        // Criar um novo usuário no banco de dados com o hash da senha e a URL da imagem
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
          phone,
          address,
          city,
          age,
          civilStatus,
          imagem: imageUrl
        });

        res.status(201).json(newUser);
      } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ error: 'Erro ao criar usuário' });
      }
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

module.exports = router;
