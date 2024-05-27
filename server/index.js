const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/modeluser');
const ImovelUser = require('./models/modelimovel');
const { storage } = require('./multerconfig');
const Imovels = require('./models/modelimovel');
const path = require('path');
const Anuncios = require('./models/modelanuncio');

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const modelouser = require('./models/modeluser');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;
const secret = require('./secret.js');
const passport = require('./passport-config.js');
const passportConfig = require('./passport-config'); // Substitua pelo caminho correto do seu arquivo de configuração do Passport.js

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));

// Inicialização do Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Configuração do CORS
const corsOptions = {
  origin: '*', // Ou defina a origem permitida especificamente: 'http://localhost:3000'
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['Access-Control-Allow-Origin']
};
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploads = multer({ storage: storage });

app.post('/uploads', uploads.array('file', 3), async (req, res) => {
  try {
    const { body, files } = req;
    const fileUrls = [];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

    files.forEach(file => {
      const oldPath = file.path;
      const fileExtension = file.originalname.split('.').pop();
      const newFileName = `${file.originalname.split('.')[0]}-${uniqueSuffix}.${fileExtension}`;
      const newPath = path.join(__dirname, 'uploads', newFileName);
      fs.renameSync(oldPath, newPath);
      const fileUrl = `/uploads/${newFileName}`;
      fileUrls.push(fileUrl);
    });

    await saveFileUrlsToDatabase(fileUrls);

    console.log('Arquivos enviados para a pasta uploads com sucesso');
    res.status(201).json({ message: 'Arquivos enviados para a pasta uploads com sucesso' });
  } catch (error) {
    console.error('Erro ao mover arquivos:', error);
    res.status(500).json({ error: 'Erro ao mover arquivos' });
  }
});

async function saveFileUrlsToDatabase(fileUrls) {
  try {
    imagensSalvas = fileUrls;
    console.log('URLs dos arquivos salvas na variável imagensSalvas:', imagensSalvas);
  } catch (error) {
    console.error('Erro ao salvar URLs dos arquivos na variável imagensSalvas:', error);
    throw error;
  }
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Recebido pedido de login:', { email, password });

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('Usuário não encontrado para o email:', email);
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

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

app.post('/user', async (req, res) => {
  try {
    if (imagensSalvas.length === 0) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    const newUser = await User.createWithImageUrl(req.body, imagensSalvas[0]);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

app.post('/imovel', async (req, res) => {
  try {
    if (imagensSalvas.length === 0) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    const newImovel = await Imovels.create({
      ...req.body,
      imageUrl: imagensSalvas[0]
    });
    res.status(201).json(newImovel);
  } catch (error) {
    console.error('Erro ao criar Imovel:', error);
    res.status(500).json({ error: 'Erro ao criar imovel' });
  }
});

app.get('/buscaimoveis', async (req, res) => {
  try {
    const imoveis = await Imovels.findAll();
    const imoveisComImagens = imoveis.map(imovel => {
      const imageUrl = `${imovel.imageUrl}`;
      return { ...imovel.toJSON(), imageUrl: imageUrl };
    });
    res.status(200).json(imoveisComImagens);
  } catch (error) {
    console.error('Erro ao buscar Imovel:', error);
    res.status(500).json({ error: 'Erro ao buscar imóvel' });
  }
});

app.get('/buscausuarios', async (req, res) => {
  try {
    const usuarios = await modelouser.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.post('/anuncio', async (req, res) => {
  try {
    if (imagensSalvas.length === 0) {
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    const novoAnuncio = await Anuncios.create({
      ...req.body,
      imageAnuncio: imagensSalvas[0]
    });
    res.status(201).json(novoAnuncio);
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    res.status(500).json({ error: 'Erro ao criar anúncio' });
  }
});

app.get('/buscaranuncio', async (req, res) => {
  try {
    const anuncios = await Anuncios.findAll();
    res.status(200).json(anuncios);
  } catch (error) {
    console.error('Erro ao buscar anúncios:', error);
    res.status(500).json({ error: 'Erro ao buscar anúncios' });
  }
});

app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  try {
    await User.sync();
    await ImovelUser.sync();
    await Anuncios.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
});
