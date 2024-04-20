const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize2'); // Importe a instância do Sequelize corretamente


const Imovel = sequelize.define('Imovels', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Tipo_imovel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  venda_aluguel: {
    type: DataTypes.STRING,
    allowNull: false
  },
  garagem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  piscina: {
    type: DataTypes.STRING
  },
  novo_usada: {
    type: DataTypes.ENUM('Novo', 'Usado'),
    allowNull: false
  },
  // Novos campos para as URLs das imagens
  imageUrl: { 
    type: DataTypes.STRING,
    allowNull: false// Você pode ajustar o tipo de dados conforme necessário
  }
}, 
{
  timestamps: true,
  // Mapeamento dos valores do banco de dados para os valores que você deseja usar no código
  getterMethods: {
    novo_usada() {
      const value = this.getDataValue('novo_usada');
      if (value === 'Novo') {
        return 'Novo';
      } else if (value === 'Usado') {
        return 'Usado';
      }
      return value;
    }
  }
});

module.exports = Imovel;
