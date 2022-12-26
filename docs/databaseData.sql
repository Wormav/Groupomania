-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id_comment` int NOT NULL AUTO_INCREMENT,
  `comment_user_id` int NOT NULL,
  `comment_post_id` int NOT NULL,
  `comment_content` longtext NOT NULL,
  `comment_create_time` datetime NOT NULL,
  `comment_update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id_comment`),
  UNIQUE KEY `id_comment_UNIQUE` (`id_comment`),
  KEY `idUserComment_idx` (`comment_user_id`),
  KEY `idPostComment_idx` (`comment_post_id`),
  CONSTRAINT `idPostComment` FOREIGN KEY (`comment_post_id`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUserComment` FOREIGN KEY (`comment_user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (15,27,206,' Oui, c\'est au sujet de quoi-t\'est-ce ?','2022-12-25 15:31:53',NULL),(16,25,206,'C\'est au sujet que ce matin je suis passé par hasard devant vos enclos, et j\'ai vu que vous aviez une jolie p\'tite poule blanche !','2022-12-25 15:32:27',NULL),(17,27,206,'Oui, tout à fait !','2022-12-25 15:33:16',NULL),(18,25,206,'Une jolie petite poule \'voyez, le bel animal […] C\'est au sujet qu\'en fait c\'est la mienne, et que vous allez prendre un pain dans la tête, mais quelque chose de violent !','2022-12-25 15:33:56',NULL),(20,23,205,'Non mais Sire, faut pas prendre ce qu\'on dit au sérieux, vous savez bien qu\'on est des cons, nous.','2022-12-25 15:41:02',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follows` (
  `follow_id_user` int NOT NULL,
  `follow_id_follow` int NOT NULL,
  KEY `userIDFollower_idx` (`follow_id_user`,`follow_id_follow`),
  KEY `userIDFollowing_idx` (`follow_id_follow`),
  KEY `userIDFollowers_idx` (`follow_id_user`),
  CONSTRAINT `userIDFollowers` FOREIGN KEY (`follow_id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `userIDFollowing` FOREIGN KEY (`follow_id_follow`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES (1,2),(23,22),(23,24),(23,25),(27,25);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `like_user_id` int NOT NULL,
  `like_post_id` int NOT NULL,
  KEY `idUserLike_idx` (`like_user_id`),
  KEY `idPostLike_idx` (`like_post_id`),
  CONSTRAINT `idPostLike` FOREIGN KEY (`like_post_id`) REFERENCES `posts` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `idUserLike` FOREIGN KEY (`like_user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (24,205),(27,206),(25,206),(25,205),(27,205),(23,207),(23,208);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id_post` int NOT NULL AUTO_INCREMENT,
  `post_user_id` int NOT NULL,
  `post_content` text NOT NULL,
  `post_picture` varchar(255) DEFAULT NULL,
  `post_create_time` datetime NOT NULL,
  `post_upadate_time` datetime DEFAULT NULL,
  `arrayLikes` int DEFAULT NULL,
  PRIMARY KEY (`id_post`),
  UNIQUE KEY `id_post_UNIQUE` (`id_post`),
  KEY `userIdPost_idx` (`post_user_id`),
  CONSTRAINT `idUserPost` FOREIGN KEY (`post_user_id`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (205,22,'Pour le Graal, j’ai bâti une forteresse, moi. Kaamelott, ça s’appelle. J’ai été chercher des chevaliers dans tout le royaume. En Calédonie, en Carmélide, à Gaunes, à Vannes, aux Pays de Galles. J’ai fait construire une grande table, pour que les chevaliers s’assoient ensemble. Je l’ai voulue ronde, pour qu’aucun d’entre eux ne se retrouve assis dans un angle, ou en bout de table. C’était compliqué, alors j’ai essayé d’expliquer ce qu’était le Graal, pour que tout le monde comprenne. C’était difficile, alors j’ai essayé de rigoler pour que personne ne s’ennuie. J’ai raté, mais je veux pas qu’on dise que j’ai rien foutu, parce que c’est pas vrai.','./public/images/posts/1671981727192.webp','2022-12-25 15:22:07',NULL,NULL),(206,25,'(À Roparzh) Excusez ! Y a moyen de vous entretenir deux secondes ?',NULL,'2022-12-25 15:29:21',NULL,NULL),(207,23,'Faut arrêter ces conneries de nord et de sud ! Une fois pour toutes, le nord, suivant comment on est tourné, ça change tout !',NULL,'2022-12-25 15:39:55',NULL,NULL),(208,23,'On a une autorité naturelle, il faut en profiter... J\'suis sûr que même à poil on ferait toujours chef !','./public/images/posts/1671982898379.jpg','2022-12-25 15:41:38',NULL,NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `user_username` varchar(45) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_picture` varchar(255) NOT NULL DEFAULT '/public/images/profils/default.png',
  `user_bio` text,
  `user_admin` tinyint NOT NULL DEFAULT '0',
  `user_activ` tinyint NOT NULL DEFAULT '1',
  `user_create_date` date NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `id_user_UNIQUE` (`id_user`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `user_username_UNIQUE` (`user_username`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'undefined','undefined','$2b$10$tKQp3N3Kn5QNzeBiOSPzlu2D4bZwYTmhs/ufVdf5hTZEaty/MSwbG','./images/profils/1668354355819.png','undefined',1,1,'2022-11-12'),(2,'test','test@gmail.com','$2b$10$WBkHWKEO6uD8QZ7CvDOraeBIhkzlsyyvbfa8qNMoHF1iTbtzuGPv6','./images/profils/default.png',NULL,0,1,'2022-11-13'),(3,'testuser','testuser@gmail.com','$2b$10$Rv1FS3iN1maNjOzvLyst/Ordcg./ZK5w5bLsCTtAO9FFqXyhIYf/K','./images/profils/default.png',NULL,0,1,'2022-11-25'),(8,'testuser2','testuser2@gmail.com','$2b$10$ExkwKmmtYp3GBQ.3sJOLPemeCAdqlWIOZISBq46MQFY/f6bhTfWnu','./images/profils/default.png',NULL,0,1,'2022-11-25'),(10,'testuser3','testuser3@gmail.com','$2b$10$gyNaH1SJ8plTVJd13XbH7.dIvuda3zrsZbZ9zAYnmdm79ChQF5MCe','./images/profils/default.png',NULL,0,1,'2022-11-25'),(11,'TESTSTT','testeur@gmail.com','$2b$10$aMwT5AGZmOX6mzhx68v33OJUJLzM3CHrK/UOLJfLJyB0l3ED1k8FG','./images/profils/default.png',NULL,0,1,'2022-11-25'),(12,'sszzsz','wormavv@gmail.com','$2b$10$v4eDPyuPfJsSs7AGGkJPKOdlGWYwRXM9LTzb28s6FS1D1RDbSWnXG','./images/profils/default.png',NULL,0,1,'2022-11-25'),(15,'iopiop','testeur4@gmail.com','$2b$10$HfapKODtlFmHRgMufUsRNehOXh4Km8ThI3z4YyZ4gKsX7vyNKZt.S','./images/profils/default.png',NULL,0,1,'2022-11-27'),(16,'ththyhh','testeur44@gmail.com','$2b$10$HU.4k2RxL5LRiNhPmDJsU.92kck6ofvJFvN6rRg4DMu19OYZ188Oy','./images/profils/default.png',NULL,0,1,'2022-11-27'),(19,'iojiedjeid','testeur6@gmail.com','$2b$10$KZjlEJacVIG334Zrge0MGeCXMxhdwckqyk0g6D5ccdsKhxvM8S2wu','./images/profils/default.png',NULL,0,0,'2022-11-27'),(20,'jbsjbxzjb','test2@free.fr','$2b$10$RrMZqdcjHgvP6C9V/I5T4O19O1Fw.mPi8DSr1TexNo4onUFeB2/e.','./images/profils/default.png',NULL,0,1,'2022-11-27'),(21,'leTestur','testeurcompte@gmail.com','$2b$10$gZJuAnntLGhfiLXaXIXDfOZlWmH2QQcuq9RHEz/E5VymIzn1c3bO2','./images/profils/default.png',NULL,0,1,'2022-11-30'),(22,'Arthur Pendragon','le-sanglier-de-cornouaille@gmail.com','$2b$10$pwlHECNGUU/xADoXBRq67uj1wml9q6qC5khEh7/4XYsn87eCXRggm','./public/images/profils/1669916935063.jpg','Le roi Arthur ou Arthur Pendragon est, d\'après les romances médiévales, un seigneur breton qui aurait organisé la défense des peuples celtes des îles Britanniques et de Bretagne armoricaine face aux envahisseurs germaniques à la fin du Vᵉ siècle ou au début du VIᵉ siècle.',0,1,'2022-12-01'),(23,'Provencale le gaulois','cest-pas-faux@gmail.com','$2b$10$1/dzyfJSsj/phdWu6zF/quL3QBGkUG5ESCt.iLg1HNA5EcWzv3ODS','./public/images/profils/1671982738105.jpg','Perceval est dans la légende arthurienne un des chevaliers de la Table ronde. Dans la littérature galloise, son nom est Peredur. Il est surtout connu pour sa participation à la quête du Saint-Graal.\r\n',0,1,'2022-12-01'),(24,'Roparzh','roparzh@gmail.com','$2b$10$sSj3YUJX/Av9kcACMvIXI./YFDPVKN.UxIkEl2OVtXomfAp2vYra.','./public/images/profils/1671982010364.webp','Roparzh est assez stupide, de même que son éternel rival Guethenoc, avec lequel il se bagarre souvent pour des futilités (tel qu\'un cabanon, une poule etc). Les deux hommes vont jusqu\'à empoisonner des troupeaux ou encore déclencher des incendies dans la forêt pour se mettre des bâtons dans les roues, ce qui cause des troubles permanents qu\'Arthur se doit d\'arbitrer. Il anime régulièrement des révoltes paysannes avec de dernier, les deux hommes s\'estimant victime d\'un gouvernement oppressif et sans considération pour la condition paysanne.\r\n\r\n',0,1,'2022-12-25'),(25,'Guethenoc','Guethenoc@gmail.com','$2b$10$GouLeZqKOLBYFkeThBRxqexiwNKRdVK4dop/Nia/.mG0rqS8MjKXy','./public/images/profils/1671982128635.webp','Guethenoc est un grand adepte des révoltes sans motifs. Considéré comme porte-parole des paysans au même titre que Roparzh, il s\'exprime avec un fort accent. Les discussions courtoises avec son voisin ne durent jamais bien longtemps et leurs conflits finissent souvent en séance de doléances.\r\n\r\nSouvent désireux de recevoir une compensation financière aux problèmes qu\'il signale, il semble plutôt vénal. Lorsque son âne est tué par Roparzh dans Feu L\'Âne De Guethenoc, ce dernier indique qu\'il ne s\'occupe pas très bien de ses bêtes, et Guethenoc admet lui-même les laisser se déplacer librement et baigner dans leurs excréments. Il a néanmoins sa fierté, surtout quand il s\'agit de la qualité de ses produits.',0,1,'2022-12-25'),(27,'Roparzhh','roparzh2@gmail.com','$2b$10$P9P8ZxKjBEOFVR5leKoTfebCnkLZebRw7uMZW2QxoiSKRE2KtADA6','./public/images/profils/1671982277426.webp','Roparzh est assez stupide, de même que son éternel rival Guethenoc, avec lequel il se bagarre souvent pour des futilités (tel qu\'un cabanon, une poule etc). Les deux hommes vont jusqu\'à empoisonner des troupeaux ou encore déclencher des incendies dans la forêt pour se mettre des bâtons dans les roues, ce qui cause des troubles permanents qu\'Arthur se doit d\'arbitrer. Il anime régulièrement des révoltes paysannes avec de dernier, les deux hommes s\'estimant victime d\'un gouvernement oppressif et sans considération pour la condition paysanne.',0,1,'2022-12-25'),(28,'poursupp','poursupp@gmail.com','$2b$10$miplNyGDNp3zk4HHqh.wr.OSBAn0HcwhaeE6rEvNCaZr/tfefbzQa','/public/images/profils/default.png',NULL,0,0,'2022-12-25'),(29,'pourvraimentsupp','pourvraimentsupp@gmail.com','$2b$10$Urzb/D41aaQpogzf7h9Gke6uZSINQuBdRvyBDUfXoOkmmdO7ZmNSO','/public/images/profils/default.png',NULL,0,0,'2022-12-25');
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

-- Dump completed on 2022-12-26  1:06:47
