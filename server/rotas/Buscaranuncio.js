// Importe os módulos necessários
const express = require('express');
const router = express.Router();
const Anuncio = require('../models/modelanuncio'); // Importe o modelo de Anúncio
const cors = require('cors'); // Importe o módulo CORS

// Defina as opções CORS
const corsOptions = {
  origin: '*',  // Adicione a fonte permitida
  methods: ['GET'], // Especifique os métodos permitidos
};

// Use o middleware CORS com as opções definidas
router.use(cors(corsOptions));

// Rota para buscar todos os anúncios
router.get('/buscaranuncio', async (req, res) => {
  try {
    // Busque todos os anúncios no banco de dados
    const anuncios = await Anuncio.find();

    // Envie uma resposta com os anúncios encontrados
    res.status(200).json(anuncios);
  } catch (error) {
    // Se ocorrer um erro, envie uma resposta de erro com o status 500 e uma mensagem de erro
    console.error('Erro ao buscar anúncios:', error);
    res.status(500).json({ error: 'Erro ao buscar anúncios.' });
  }
});

// Exporte a rota
module.exports = router;
