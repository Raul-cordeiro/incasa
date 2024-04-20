-- Criação da tabela Imovels
CREATE TABLE Imovels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Tipo_imovel VARCHAR(255) NOT NULL,
    venda_aluguel VARCHAR(255) NOT NULL,
    garagem VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    piscina VARCHAR(255),
    novo_usada ENUM('Novo', 'Usado') NOT NULL,
    imageUrl VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela Users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255),
    address VARCHAR(255),
    city VARCHAR(255),
    cpfCnpj VARCHAR(255),
    age INT,
    civilStatus VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
