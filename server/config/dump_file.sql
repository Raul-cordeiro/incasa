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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imovels`
--

LOCK TABLES `imovels` WRITE;
/*!40000 ALTER TABLE `imovels` DISABLE KEYS */;
INSERT INTO `imovels` VALUES (9,'Casa ','Aluguel','Sim','(62) 98468-7974','Rua 9 nª82','Inhumas','Sim','Usado','http://localhost:5000/uploads/casa2.png','2024-04-05 22:08:05','2024-04-05 22:08:05'),(10,'casa','Venda','sim 2','(62) 98468-7974','Rua 9 nª82','Inhumas','Sim','Novo','http://localhost:5000/uploads/chacara.jpg','2024-04-06 01:45:59','2024-04-06 01:45:59'),(11,'Chácara','Aluguel','Sim 4','(62) 98468-7974','Rua 9 nª82','Inhumas','Sim','Novo','http://localhost:5000/uploads/espaÃ§o2.jpg','2024-04-06 03:48:46','2024-04-06 03:48:46'),(12,'Apartamento','Aluguel','Sim 1','(62) 98468-7974','Rua 9 nª82','Inhumas','Sim','Novo','http://localhost:5000/uploads/cenario1.webp','2024-04-06 03:50:02','2024-04-06 03:50:02');
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
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `cpfCnpj` varchar(255) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `civilStatus` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'raul','raulcordeirocontato@gmail.com','1234','62987687974','rua 9','inhumas','99742764115',52,'solo','2024-03-26 00:49:00','2024-03-26 00:49:00'),(2,'Jeane','admin@admin.com','12345','62985698774','rua 7','Inhumas','997.427.641-15',23,'solo','2024-03-26 17:52:44','2024-03-26 17:52:44'),(3,'cordeiro','contato@gmail.com','1234','555555555555','rua 7','Inhumas','997.427.641-15',41,'solo','2024-03-27 00:17:18','2024-03-27 00:17:18'),(4,'raul','admin@admin.com','12345','62987457874','rua  99','inhumas','77458457445',16,'solo','2024-03-27 13:11:26','2024-03-27 13:11:26'),(5,'nilva','AAAAA@GMAIL.COM','54321','986025479','rua  99','inhumasd','44577444588',21,'casado','2024-03-27 14:22:45','2024-03-27 14:22:45'),(6,'lorena','admin@admin.com','44444','5555555555','sdfasdfa','sdfgasdfgas','8752375638534',4744,'dfbdfg','2024-03-27 14:31:57','2024-03-27 14:31:57'),(7,'igor henrique','raul@raul.com','123','62987468974','rua 9','goiabeiras','99875486555',45,'solo','2024-03-28 15:58:57','2024-03-28 15:58:57'),(8,'aaaa','raulcordeirocontato@gmail.com','11111111111111','555555555555','rua 7','Inhumas','997.427.641-15',2,'solo','2024-03-29 23:00:05','2024-03-29 23:00:05'),(9,'Jeane Borges','jeane@gmail.com','123456','62984687974','kd vc','inhumas','997742764115',14,'solteiro','2024-03-30 11:07:18','2024-03-30 11:07:18'),(10,'Raul Cordeiro Borges','fdghfdgh@dfgsdfgsd','4537456','62984687974','ssss','sss','11111111111',1111,'dfgbdgf','2024-03-30 14:07:01','2024-03-30 14:07:01'),(11,'nilva','Raulteste@gmail','safdgasfrd','62984687974','asdasd','Inhumas','11111111111',4,'sasaa','2024-03-30 14:40:06','2024-03-30 14:40:06'),(12,'nilva','raulcordeirocontato@gmail.COM','CVXZCVXZCV','62984687974','Rua 9 de dezembro9 n 82','sss','11111111111',3,'dfgbdgf','2024-03-30 18:47:53','2024-03-30 18:47:53'),(13,'Raul Cordeiro Borges','admin@admin.com','DFFGDF','62984687974','asdasd','Inhumas','11111111111',1111111,'sasaa','2024-03-30 18:49:25','2024-03-30 18:49:25'),(14,'Raul Cordeiro Borges','admin@admin.com','33333','62984687974','Rua 9 de dezembro9 n 82','Inhumas','11111111111',3,'sasaa','2024-03-31 01:15:28','2024-03-31 01:15:28');
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

-- Dump completed on 2024-04-06  1:30:27
