// Importe os módulos necessários
const express = require('express');
const router = express.Router();
const Anuncios = require('../models/modelanuncio'); // Importe o modelo de Anúncio
const { upload } = require('./multerconfig'); // Importe a configuração do multer

// Rota para lidar com a criação de novos registros de anúncios
router.post('/anuncio', upload.single('imageAnuncio'), async (req, res) => {
  try {
    // Obtenha os dados do corpo da solicitação
    const { nomeEmpresa, telefone, endereco, email,imageAnuncio } = req.body;
    
    // Obtenha a URL da imagem salva no servidor
    const imageUrl = req.file.path; // Obtém o caminho da imagem salva pelo multer

    // Crie um novo anúncio no banco de dados
    const novoAnuncio = await Anuncios.create({
      nomeEmpresa,
      telefone,
      endereco,
      email,
      imageAnuncio: imageUrl // Preenche o campo 'imageAnuncio' com o caminho da imagem salva
    });

    // Envie uma resposta indicando que o anúncio foi adicionado com sucesso
    res.status(201).json({ message: 'Anúncio adicionado com sucesso.', anuncio: novoAnuncio });
  } catch (error) {
    // Se ocorrer um erro, envie uma resposta de erro com o status 500 e uma mensagem de erro
    console.error('Erro ao adicionar anúncio:', error);
    res.status(500).json({ error: 'Erro ao adicionar anúncio.' });
  }
});

module.exports = router;
