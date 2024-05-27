const crypto = require('crypto');

// Gerar um segredo aleatório com 64 bytes (512 bits)
const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const secret = generateSecret();
console.log('Segredo gerado:', secret);

module.exports = secret;
