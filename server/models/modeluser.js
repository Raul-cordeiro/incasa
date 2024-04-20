const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('./sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(60),
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
  age: {
    type: DataTypes.INTEGER
  },
  civilStatus: {
    type: DataTypes.STRING
  },
  imagem: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.createWithImageUrl = async function (data, imageUrl) {
  try {
    const newUser = await this.create({ ...data, imagem: imageUrl });
    return newUser;
  } catch (error) {
    throw new Error('Erro ao criar usuário com URL da imagem:', error);
  }
};

module.exports = User;