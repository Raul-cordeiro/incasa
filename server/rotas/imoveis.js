const express = require('express');
const router = express.Router();
const Imovels = require('../models/modelimovel');
const { upload } = require('./multerconfig'); // Importe a configuração do multer
const imagensSalvas = require('./index')

// Rota para lidar com a criação de um novo imóvel
app.post('/imovel', async (req, res) => {
  try {
    // Extrair a URL da imagem da variável imagensSalvas
    const imageUrl = imagensSalvas[0]; // Supondo que você deseja usar a primeira URL salva
    
    // Extrair outros dados do corpo da solicitação
    const { Tipo_imovel, venda_aluguel, garagem, phone, address, city, piscina, nova_usada } = req.body;

    // Criar um novo imóvel no banco de dados com a URL da imagem
    const newImovel = await Imovels.create({
        Tipo_imovel,
        venda_aluguel,
        garagem,
        phone,
        address,
        city,
        piscina,
        nova_usada,
        imageUrl: imageUrl // Salvar a URL completa da imagem no banco de dados
    });

    // Responder com o novo imóvel criado
    res.status(201).json(newImovel);
  } catch (error) {
      console.error('Erro ao criar Imovel:', error);
      res.status(500).json({ error: 'Erro ao criar imovel' });
  }
});

// Rota para buscar todos os imóveis
router.get('/buscaimoveis', async (req, res) => {
  try {
    // Buscar todos os imóveis no banco de dados
    const imoveis = await Imovels.findAll();

    // Mapear os imóveis para extrair apenas as propriedades necessárias
    const imoveisComImagens = imoveis.map(imovel => {
      return {
        id: imovel.id,
        Tipo_imovel: imovel.Tipo_imovel,
        venda_aluguel: imovel.venda_aluguel,
        garagem: imovel.garagem,
        phone: imovel.phone,
        address: imovel.address,
        city: imovel.city,
        piscina: imovel.piscina,
        novo_usada: imovel.novo_usada,
        imageUrl: imovel.imageUrl  // Defina uma URL padrão vazia se a imageUrl estiver indefinida
      };
    });

    // Responder com a lista de imóveis
    res.status(200).json(imoveisComImagens);
  } catch (error) {
    // Se houver um erro, responder com o status de erro e uma mensagem de erro
    console.error('Erro ao buscar imóveis:', error);
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
});

