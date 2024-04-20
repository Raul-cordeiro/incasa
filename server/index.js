// Importe os módulos necessários
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const User = require('./models/modeluser');
const ImovelUser = require('./models/modelimovel');
const { storage } = require('./multerconfig'); // Importe a storage de multerconfig
const Imovels = require('./models/modelimovel');
const path = require('path');
const Anuncios = require('./models/modelanuncio');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const modelouser = require ('./models/modeluser')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Servindo arquivos estáticos da pasta de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const uploads = multer({ storage: storage });

app.post('/uploads', uploads.array('file', 3), async (req, res) => {
  try {
    const { body, files } = req;
    const fileUrls = [];

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Gera um sufixo único

    files.forEach(file => {
      const oldPath = file.path;
      const fileExtension = file.originalname.split('.').pop(); // Obtém a extensão do arquivo
      const newFileName = `${file.originalname.split('.')[0]}-${uniqueSuffix}.${fileExtension}`; // Adiciona o sufixo único ao nome do arquivo
      const newPath = `uploads/${newFileName}`;
      fs.renameSync(oldPath, newPath);
      const fileUrl = `http://localhost:5000/uploads/${newFileName}`;
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
    // Salve as URLs das imagens na variável imagensSalvas
    imagensSalvas = fileUrls;

    console.log('URLs dos arquivos salvas na variável imagensSalvas:', imagensSalvas);
  } catch (error) {
    console.error('Erro ao salvar URLs dos arquivos na variável imagensSalvas:', error);
    throw error;
  }
}

//  rota '/login' que lida com o login do usuário
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Recebido pedido de login:', { email, password });

    // Procurar o usuário pelo email fornecido
    const user = await User.findOne({ where: { email } });

    // Verificar se o usuário existe
    if (!user) {
      console.log('Usuário não encontrado para o email:', email);
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }

    // Comparar a senha fornecida com o hash da senha armazenada no banco de dados
    const isMatch = await bcrypt.compare(password, user.password);

    // Verificar se as senhas correspondem
    if (isMatch) {
      console.log('Login bem-sucedido para o usuário:', user.id);
      // Se as senhas coincidirem, o login é bem-sucedido
      return res.status(200).json({ success: true });
    } else {
      console.log('Senha incorreta para o usuário:', user.id);
      // Se as senhas não coincidirem, o login falha
      return res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
  } catch (error) {
    console.error('Erro durante o login:', error);
    return res.status(500).json({ message: 'Erro ao conectar ao servidor.' });
  }
});

// Rota para criar um novo usuário
//// Rota para criar um novo usuário
app.post('/user', async (req, res) => {
  try {
    // Verifique se imagensSalvas não está vazio antes de usá-lo
    if (imagensSalvas.length === 0) {
      // Se imagensSalvas estiver vazio, retorne um erro
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    // Acesse imagensSalvas diretamente no objeto de solicitação req
    const newUser = await User.createWithImageUrl(req.body, imagensSalvas[0]); // Passa a URL da primeira imagem
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});



// Rota para criar um novo imóvel
app.post('/imovel', async (req, res) => {
  try {
    // Verifique se imagensSalvas não está vazio antes de usá-lo
    if (imagensSalvas.length === 0) {
      // Se imagensSalvas estiver vazio, retorne um erro
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    // Acesse imagensSalvas diretamente no objeto de solicitação req
    const newImovel = await Imovels.create({
      ...req.body,
      imageUrl: imagensSalvas[0] // Use a primeira URL da lista de imagens salvas
    });
    res.status(201).json(newImovel);
  } catch (error) {
    console.error('Erro ao criar Imovel:', error);
    res.status(500).json({ error: 'Erro ao criar imovel' });
  }
});

// Rota para buscar todos os imóveis
app.get('/buscaimoveis', async (req, res) => {
  try {
    const imoveis = await Imovels.findAll();
    
    const imoveisComImagens = imoveis.map(imovel => {
      const imageUrl = `${imovel.imageUrl}`;
      return {
        ...imovel.toJSON(),
        imageUrl: imageUrl
      };
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


// Rota para criar um novo anúncio
app.post('/anuncio', async (req, res) => {
  try {
    // Verifique se imagensSalvas não está vazio antes de usá-lo
    if (imagensSalvas.length === 0) {
      // Se imagensSalvas estiver vazio, retorne um erro
      return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
    }

    // Acesse imagensSalvas diretamente no objeto de solicitação req
    const novoAnuncio = await Anuncios.create({
      ...req.body,
      imageAnuncio: imagensSalvas[0] // Use a primeira URL da lista de imagens salvas
    });
    res.status(201).json(novoAnuncio);
  } catch (error) {
    console.error('Erro ao criar anúncio:', error);
    res.status(500).json({ error: 'Erro ao criar anúncio' });
  }
});

// Rota para buscar todos os anúncios
app.get('/buscaranuncio', async (req, res) => {
  try {
    // Buscar todos os anúncios no banco de dados
    const anuncios = await Anuncios.findAll();

    // Responder com a lista de anúncios
    res.status(200).json(anuncios);
  } catch (error) {
    // Se houver um erro, responder com o status de erro e uma mensagem de erro
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
