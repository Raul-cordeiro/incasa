const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize3'); // Importe a instância do Sequelize corretamente

const Anuncios = sequelize.define('Anuncios', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nomeEmpresa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageAnuncio: {
    type: DataTypes.STRING, // Pode armazenar a URL da imagem do anúncio
    allowNull: false
  }
}, {
  timestamps: true
});

Anuncios.createWithImageUrl = async function (data, imageUrl) {
  try {
    const newAnuncio = await this.create({ ...data, imageAnuncio: imageUrl });
    return newAnuncio;
  } catch (error) {
    throw new Error('Erro ao criar anúncio com URL da imagem:', error);
  }
};

module.exports = Anuncios;
