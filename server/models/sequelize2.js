const { Sequelize } = require('sequelize');
const config = require('../config/config');

// Importe o modelo User e Imovel aqui
const Imovels = require('./modelimovel');


// Extrair as configurações específicas do ambiente de desenvolvimento
const { username, password, database, host, dialect } = config.development;

// Configurações do banco de dados
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});

// Defina os modelos User e Imovel aqui, passando apenas a instância do Sequelize como argumento
const ImovelModel = Imovels;
 

// Testar conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Execute a migração para criar as tabelas no banco de dados
    await sequelize.sync();
    console.log('Tabelas sincronizadas com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
})();

module.exports = sequelize;
