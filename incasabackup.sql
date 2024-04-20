-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: incasadb
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anuncio
--

DROP TABLE IF EXISTS `anuncios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anuncios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomeEmpresa` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `endereco` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `imageAnuncio` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anuncios`
--

LOCK TABLES `anuncios` WRITE;
/*!40000 ALTER TABLE `anuncios` DISABLE KEYS */;
INSERT INTO `anuncios` VALUES (1,'Raul Cordeiro Tecnologias','62984687974','Rusa 9 de dexzembro','contato@raulcordeiro.com','http://localhost:5000/uploads/logo-1713292956381-228049110.png','2024-04-16 18:42:36','2024-04-16 18:42:36'),(2,'Raul Empreendimentos','62984687974','Rua 9 de dezembro n°82','admin@adminmm.com','http://localhost:5000/uploads/WhatsApp Image 2024-04-03 at 4-1713306269555-536376162.jpeg','2024-04-16 22:24:29','2024-04-16 22:24:29');
/*!40000 ALTER TABLE `anuncios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imovels`
--

DROP TABLE IF EXISTS `imovels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imovels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo_imovel` varchar(255) NOT NULL,
  `venda_aluguel` varchar(255) NOT NULL,
  `garagem` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `piscina` varchar(255) DEFAULT NULL,
  `novo_usada` enum('Novo','Usado') NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imovels`
--

LOCK TABLES `imovels` WRITE;
/*!40000 ALTER TABLE `imovels` DISABLE KEYS */;
INSERT INTO `imovels` VALUES (1,'Casa ','Aluguel','Sim 2','(62) 98468-7974','Rua 9 nª82','Inhumas','Sim','Novo','http://localhost:5000/uploads/chacara-1713293177428-156194517.jpg','2024-04-16 18:46:17','2024-04-16 18:46:17'),(2,'apartamento','Venda','Sim 2','(62) 98468-7974','Rua 9 nª82','Goiãnia','Sim','Usado','http://localhost:5000/uploads/cenario-1713298567518-735534723.webp','2024-04-16 20:16:07','2024-04-16 20:16:07'),(3,'Casa','Aluguel','Sim 1','629884687974','Rua 10 de Abril','Inhumas','Não','Usado','http://localhost:5000/uploads/casa1-1713298633093-154941942.png','2024-04-16 20:17:13','2024-04-16 20:17:13'),(4,'Espaço de Eventos','Aluguel','Sim 3','(62) 98468-7974','Zona Rural','Inhumas','','Novo','http://localhost:5000/uploads/espaÃ§o2-1713298702951-768280292.jpg','2024-04-16 20:18:22','2024-04-16 20:18:22'),(5,'Chácara','Aluguel','Sim 2','(62) 98468-7974','Rua 9 nª82','','Sim','Novo','http://localhost:5000/uploads/espaÃ§o-1713312330119-260234128.jpg','2024-04-17 00:05:30','2024-04-17 00:05:30');
/*!40000 ALTER TABLE `imovels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `civilStatus` varchar(255) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'Raul Cordeiro ','Admin@admimmm.com','$2a$10$u38S8GR50bSFPcPu/LrDze71BKsx.0ha2iiME0suqWxaJ5p6vxcaO','629845687974','Rua 9 de dezembro','Inhumas',12,'Solteiro(a)','http://localhost:5000/uploads/54516274_586558571847380_7510649623078240256_n-1713305297828-625056186.jpg','2024-04-16 22:08:17','2024-04-16 22:08:17'),(19,'Arthur Henrique ','Arthur@arthur.com','$2a$10$22Bwm3MdIA/aIKhieiMvq.P3QFmChCXEZHD4R2AsWXUkyoYhRl7ZG','62984687974','Rua 9 de Dezembro','Inhumas',21,'Solteiro(a)','http://localhost:5000/uploads/arthur-1713310092030-994682123.jpg','2024-04-16 23:28:12','2024-04-16 23:28:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-16 21:51:49
