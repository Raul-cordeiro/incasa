const multer = require("multer");
const { diskStorage } = require("multer");
const { resolve, extname } = require("path");
const Imovels = require('./models/modelimovel');
const Anuncios = require('./models/modelanuncio')

const storage = diskStorage({
    destination: (req, file, callback) => {
        callback(null, resolve("uploads"));
    },
    filename: (req, file, callback) => {
        const ext = extname(file.originalname); // Obtém a extensão do arquivo original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Gera um sufixo único
        callback(null, uniqueSuffix + ext); // Usa o sufixo único junto com a extensão original como nome do arquivo
    },
});

const upload = multer({ storage: storage });




module.exports = { storage, upload };
