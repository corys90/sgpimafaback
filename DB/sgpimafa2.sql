/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.33 : Database - sgpimafa2
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sgpimafa2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `sgpimafa2`;

/*Table structure for table `clientes` */

DROP TABLE IF EXISTS `clientes`;

CREATE TABLE `clientes` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCliente` int NOT NULL,
  `TipoIdCliente` int NOT NULL,
  `Nombres` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Apellidos` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Direccion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Dpto` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Ciudad` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Telefono` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `clientes` */

insert  into `clientes`(`Id`,`IdCliente`,`TipoIdCliente`,`Nombres`,`Apellidos`,`Direccion`,`Dpto`,`Ciudad`,`Telefono`,`Email`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,73160918,1,'Cristian A.','Cortes Sarmiento','Urbanización Sta Clara Mz O Lote 17','Bolívar','Cartagena','3003189265','Corys90@hotmail.com','Corys90',00000,'2024-03-11 20:40:34','2024-03-18 16:36:00'),
(2,12345678,1,'Cristian A.','Cortes Sarmiento','Urbanización Sta Clara Mz O Lote 17','Bolívar','Cartagena','3003189265','Corys90@hotmail.com','Corys90',00001,'2024-03-11 20:40:34','2024-03-11 20:40:34'),
(3,87654321,1,'Corys90 A.','Cortes Sarmiento','Urbanización Sta Clara Mz O Lote 17','Bolívar','Cartagena','3003189265','Corys90@hotmail.com','@Corys90',00000,'2024-03-11 20:40:34','2024-03-11 20:40:34'),
(4,99999999,1,'Cristian De Jesús','Cortes Sarmiento','Urbanización Sta Clara Mz O Lote 17','Bolívar','Cartagena','3003189265','Corys90@Hotmail.com','Corys90',00000,'2024-03-11 20:40:34','2024-03-18 20:29:00'),
(6,123456789,1,'Jose','tester','Urbanización Sta Clara Mz O Lote 17','Bolívar','Barranquilla','3003189265','joseyevilao@gmail.com','',00000,'2024-03-18 21:45:00','2024-03-18 21:45:00'),
(7,0,0,'string','string','string','string','string','3003189265','corys90@hotmail.com','string',00000,'2024-05-21 20:21:42','2024-05-21 20:21:42');

/*Table structure for table `inventarioproductos` */

DROP TABLE IF EXISTS `inventarioproductos`;

CREATE TABLE `inventarioproductos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCodigo` int NOT NULL,
  `TipoProducto` int NOT NULL,
  `IdProductoCompuesto` int NOT NULL,
  `Nombre` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Descripcion` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Cantidad` float DEFAULT NULL,
  `StockMinimo` int DEFAULT NULL,
  `UnidadMedida` int DEFAULT NULL,
  `Lote` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Olor` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Color` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Textura` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Tamano` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Peso` float DEFAULT NULL,
  `Embalaje` int DEFAULT NULL,
  `Temperatura` float DEFAULT NULL,
  `ValorUnitario` int DEFAULT NULL,
  `Descuento` float DEFAULT NULL,
  `Impuesto` float DEFAULT NULL,
  `ValorIva` float DEFAULT NULL,
  `FechaCreacion` timestamp NULL DEFAULT NULL,
  `DiasVencimiento` int DEFAULT NULL,
  `FechaVencimiento` timestamp NULL DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `inventarioproductos` */

insert  into `inventarioproductos`(`Id`,`IdCodigo`,`TipoProducto`,`IdProductoCompuesto`,`Nombre`,`Descripcion`,`Cantidad`,`StockMinimo`,`UnidadMedida`,`Lote`,`Olor`,`Color`,`Textura`,`Tamano`,`Peso`,`Embalaje`,`Temperatura`,`ValorUnitario`,`Descuento`,`Impuesto`,`ValorIva`,`FechaCreacion`,`DiasVencimiento`,`FechaVencimiento`,`User`,`CreatedAt`,`UpdatedAt`) values 
(1,1,1,1,'Almeja Cris','Almeja caribeña 2',9,500,1,'123','Normal','Marrón','Normal','123',123,1,123,12500,10,19,0,'2024-01-25 00:00:00',150,'2024-06-01 20:48:00','Corys90','2024-01-25 14:54:21','2024-01-25 14:54:23'),
(2,2,2,2,'Anillo Calamar','Anillo de calamar',0,10,3,'2','Normal','Blanco','Normal',NULL,250,3,15,2500,8,30,0,'2024-01-25 14:59:50',90,'2024-01-25 14:59:56','Corys90','2024-01-25 15:00:02','2024-01-25 15:00:03'),
(3,4,2,3,'Combo 1','Combo 1',0,10,7,'3','Normal','Sin Color','Normal',NULL,5000,2,15,3500,10,20,0,'2024-01-25 15:03:58',180,'2024-01-25 15:04:08','Corys90','2024-01-25 15:04:14','2024-01-25 15:04:16'),
(4,3,1,1,'Anillo calamar V.','Anillo Calamar V.',0,10,2,'4','Normal','Balnco','Normal',NULL,200,1,15,5500,19,10,0,'2024-01-25 16:10:36',90,'2024-01-25 16:10:41','Corys90','2024-01-25 16:10:45','2024-01-25 16:10:47'),
(6,5,1,4,'Ostras','Ostras de rio',0,0,0,'','','','','',0,0,0,5365,0,0,NULL,'2024-03-25 20:19:00',0,'2024-03-25 20:19:00',NULL,'2024-03-25 20:19:00',NULL),
(7,6,1,4,'Cristian A','mi caso personal',0,15,1,'2','Normal','rojo','Normal','16',250,3,16,2999,0,190,NULL,'2024-05-26 15:42:00',60,'2024-05-26 15:42:00',NULL,'2024-05-26 15:42:00',NULL);

/*Table structure for table `poscaja` */

DROP TABLE IF EXISTS `poscaja`;

CREATE TABLE `poscaja` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdPos` int NOT NULL,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Descripcion` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` int DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `poscaja` */

insert  into `poscaja`(`Id`,`IdPos`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,1,'Caja 1','Caja Nro 1 del POS','',0,'2024-03-19 11:21:00',NULL),
(2,2,'Caja 1','Caja principal del POS','',0,'2024-03-19 11:21:00',NULL);

/*Table structure for table `poscajaarqueo` */

DROP TABLE IF EXISTS `poscajaarqueo`;

CREATE TABLE `poscajaarqueo` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCaja` int DEFAULT NULL,
  `IdPos` int DEFAULT NULL,
  `Valor` int DEFAULT NULL,
  `FechaArqueo` timestamp NULL DEFAULT NULL,
  `EstadoArqueo` int DEFAULT NULL,
  `RevisorId` int DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `poscajaarqueo` */

insert  into `poscajaarqueo`(`Id`,`IdCaja`,`IdPos`,`Valor`,`FechaArqueo`,`EstadoArqueo`,`RevisorId`,`User`,`CreatedAt`,`UpdatedAt`) values 
(1,1,2,3562990,'2024-03-05 01:58:47',1,1,'@corys90','2024-03-05 01:58:47','2024-03-05 01:58:47'),
(2,2,1,112356990,'2024-03-05 01:58:47',2,2,'Corys90','2024-03-05 01:58:47','2024-03-05 01:58:47'),
(4,1,3,5000000,'2024-03-24 23:09:00',3,3,'','2024-03-24 23:09:00',NULL),
(5,1,1,200000,'2024-04-24 19:12:00',1,1,'','2024-04-24 19:12:00',NULL);

/*Table structure for table `poscajaestado` */

DROP TABLE IF EXISTS `poscajaestado`;

CREATE TABLE `poscajaestado` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCaja` int DEFAULT NULL,
  `IdPos` int NOT NULL,
  `ValorEstado` int NOT NULL COMMENT 'Valor $ del estado de la caja. Puede ser inciail/final',
  `FechaOperacion` timestamp NOT NULL,
  `UserAccion` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT '',
  `Estado` int NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `poscajaestado` */

insert  into `poscajaestado`(`Id`,`IdCaja`,`IdPos`,`ValorEstado`,`FechaOperacion`,`UserAccion`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,1,1,2600000,'2024-03-12 02:27:04','Corys90',1,'2024-03-12 02:27:04','2024-04-07 19:49:00'),
(2,2,1,1500000,'2024-03-12 02:27:04','Virtual',2,'2024-03-12 02:27:04','2024-03-12 02:27:04'),
(4,1,2,2220000,'2024-03-12 02:27:04','Alguine',1,'2024-03-12 02:27:04','2024-03-12 02:27:04'),
(5,1,1,111111,'2024-03-25 14:36:00','',1,'2024-03-25 14:36:00','2024-03-25 14:36:00'),
(6,1,1,100000,'2024-04-24 19:36:00','',1,'2024-04-24 19:36:00','2024-04-24 19:36:00'),
(7,2,1,300000,'2024-04-24 19:37:00','',2,'2024-04-24 19:37:00','2024-04-24 19:37:00');

/*Table structure for table `poscajapagofactura` */

DROP TABLE IF EXISTS `poscajapagofactura`;

CREATE TABLE `poscajapagofactura` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCaja` int NOT NULL,
  `IdPos` int NOT NULL,
  `IdFactura` int NOT NULL,
  `formaPago` int(10) unsigned zerofill NOT NULL,
  `ValorRecibido` int NOT NULL,
  `ValorDevuelto` int NOT NULL,
  `ValorPagado` int NOT NULL,
  `FechaPago` timestamp NOT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `poscajapagofactura` */

insert  into `poscajapagofactura`(`Id`,`IdCaja`,`IdPos`,`IdFactura`,`formaPago`,`ValorRecibido`,`ValorDevuelto`,`ValorPagado`,`FechaPago`,`User`,`CreatedAt`,`UpdatedAt`) values 
(1,1,1,12,0000000002,156324,3256,6523324,'2024-04-08 00:00:00','','2024-04-08 20:39:00','2024-04-08 20:39:00'),
(2,2,1,2,0000000001,365214,6523,63325362,'2024-04-09 00:00:00','','2024-04-08 20:39:00','2024-04-08 20:39:00'),
(3,1,2,3,0000000001,21243433,323232,3232323,'2024-04-09 00:00:00','','2024-04-09 06:40:00','2024-04-09 07:15:00'),
(4,2,3,4,0000000001,3423434,65656445,42342424,'2024-04-09 00:00:00','','2024-04-09 06:40:00','2024-04-09 07:16:00'),
(5,2,2,12,0000000001,50000,24664,25346,'2024-04-08 00:00:00','','2024-04-09 07:21:00','2024-04-09 07:21:00'),
(6,1,2,12,0000000001,20000,10000,10000,'2024-04-17 00:00:00','','2024-04-17 20:28:00','2024-04-17 20:28:00'),
(7,1,1,56,0000000001,10000,5100,4900,'2024-04-18 00:00:00','','2024-04-18 07:06:00','2024-04-18 07:06:00'),
(8,1,1,56,0000000002,5000,100,4900,'2024-04-18 00:00:00','','2024-04-18 07:13:00','2024-04-18 07:13:00'),
(9,1,1,56,0000000001,20000,15100,4900,'2024-04-18 00:00:00','','2024-04-18 07:17:00','2024-04-18 07:17:00'),
(10,1,1,56,0000000001,15000,10100,4900,'2024-04-18 00:00:00','','2024-04-18 07:17:00','2024-04-18 07:17:00'),
(11,1,1,56,0000000001,5000,100,4900,'2024-04-18 00:00:00','','2024-04-18 07:18:00','2024-04-18 07:18:00'),
(12,1,1,57,0000000001,50000,36613,13387,'2024-04-18 00:00:00','','2024-04-18 13:09:00','2024-04-18 13:09:00'),
(13,1,1,59,0000000003,340690,0,340690,'2024-04-18 00:00:00','','2024-04-18 13:22:00','2024-04-18 13:22:00'),
(14,1,1,60,0000000001,14069,-20000,34069,'2024-04-18 00:00:00','','2024-04-18 13:51:00','2024-04-18 13:51:00'),
(15,1,1,62,0000000001,750000,-588750,1338750,'2024-04-18 00:00:00','','2024-04-18 20:19:00','2024-04-18 20:19:00'),
(16,1,1,62,0000000002,588750,-750000,1338750,'2024-04-18 00:00:00','','2024-04-18 20:39:00','2024-04-18 20:39:00'),
(17,1,1,64,0000000001,669375,0,669375,'2024-04-18 00:00:00','','2024-04-18 20:49:00','2024-04-18 20:49:00'),
(18,1,1,65,0000000001,307912,0,307912,'2024-04-18 00:00:00','','2024-04-18 21:20:00','2024-04-18 21:20:00'),
(19,1,1,66,0000000002,747500,0,747500,'2024-04-18 00:00:00','','2024-04-18 21:21:00','2024-04-18 21:21:00'),
(20,1,1,68,0000000001,499635,0,499635,'2024-04-18 00:00:00','','2024-04-18 21:33:00','2024-04-18 21:33:00'),
(21,1,1,69,0000000001,13387,0,13387,'2024-04-18 00:00:00','','2024-04-18 21:37:00','2024-04-18 21:37:00'),
(22,1,1,70,0000000004,26775,0,26775,'2024-04-18 00:00:00','','2024-04-18 21:41:00','2024-04-18 21:41:00'),
(23,2,2,71,0000000004,50000,-3550,53550,'2024-04-18 00:00:00','','2024-04-18 21:42:00','2024-04-18 21:42:00'),
(25,1,1,72,0000000001,2000,-11387,13387,'2024-04-18 00:00:00','','2024-04-18 22:07:00','2024-04-18 22:07:00'),
(26,1,1,73,0000000002,2000,-305912,307912,'2024-04-18 00:00:00','','2024-04-18 22:08:00','2024-04-18 22:08:00'),
(30,2,1,76,0000000001,3387,-10000,13387,'2024-04-19 00:00:00','','2024-04-19 06:44:00','2024-04-19 06:44:00'),
(31,2,1,76,0000000001,5000,-8387,13387,'2024-04-19 00:00:00','','2024-04-19 06:44:00','2024-04-19 06:44:00'),
(35,1,1,78,0000000004,50000,-83875,133875,'2024-04-19 00:00:00','','2024-04-19 06:52:00','2024-04-19 06:52:00'),
(36,1,1,78,0000000001,20000,-113875,133875,'2024-04-19 00:00:00','','2024-04-19 06:53:00','2024-04-19 06:53:00'),
(38,1,1,78,0000000001,50000,-83875,133875,'2024-04-19 00:00:00','','2024-04-19 06:53:00','2024-04-19 06:53:00'),
(41,1,1,62,0000000001,13338750,12000000,1338750,'2024-04-19 00:00:00','','2024-04-19 10:57:00','2024-04-19 10:57:00'),
(42,1,1,13,0000000001,13387,0,13388,'2024-04-19 00:00:00','','2024-04-19 11:16:00','2024-04-19 11:16:00'),
(43,1,1,14,0000000003,10000,-3387,13388,'2024-04-19 00:00:00','','2024-04-19 11:38:00','2024-04-19 11:38:00'),
(44,1,1,22,0000000001,980,-5000,5980,'2024-04-19 00:00:00','','2024-04-19 13:24:00','2024-04-19 13:24:00'),
(45,1,2,21,0000000002,980,-5000,5980,'2024-04-19 00:00:00','','2024-04-19 13:34:00','2024-04-19 13:34:00'),
(46,1,1,32,0000000001,960,-11000,11960,'2024-04-19 00:00:00','','2024-04-19 13:39:00','2024-04-19 13:39:00'),
(47,2,1,32,0000000002,11000,-960,11960,'2024-04-19 00:00:00','','2024-04-19 13:45:00','2024-04-19 13:45:00'),
(48,1,1,32,0000000001,5000,-6960,11960,'2024-04-19 00:00:00','','2024-04-19 13:50:00','2024-04-19 13:50:00'),
(49,1,1,32,0000000001,5000,-6960,11960,'2024-04-19 00:00:00','','2024-04-19 13:55:00','2024-04-19 13:55:00'),
(50,1,1,32,0000000001,5000,-6960,11960,'2024-04-19 00:00:00','','2024-04-19 14:32:00','2024-04-19 14:32:00'),
(51,1,1,33,0000000002,2500,-3480,5980,'2024-04-19 00:00:00','','2024-04-19 14:35:00','2024-04-19 14:35:00'),
(52,1,1,33,0000000003,1000,-4980,5980,'2024-04-19 00:00:00','','2024-04-19 14:38:00','2024-04-19 14:38:00'),
(53,1,1,33,0000000001,500,-5480,5980,'2024-04-18 00:00:00','','2024-04-19 14:38:00','2024-04-19 14:38:00'),
(54,1,1,33,0000000001,500,-5480,5980,'2024-04-17 00:00:00','','2024-04-19 14:39:00','2024-04-19 14:39:00'),
(55,1,1,33,0000000001,500,-5480,5980,'2024-04-19 00:00:00','','2024-04-19 15:07:00','2024-04-19 15:07:00'),
(56,1,1,33,0000000001,200,-5780,5980,'2024-04-19 00:00:00','','2024-04-19 15:13:00','2024-04-19 15:13:00'),
(57,1,1,33,0000000001,3000,-2980,5980,'2024-04-18 00:00:00','','2024-04-19 15:14:00','2024-04-19 15:20:00'),
(58,1,1,33,0000000002,5980,0,5980,'2024-04-19 00:00:00','','2024-04-19 15:14:00','2024-04-19 15:24:00'),
(60,1,1,80,0000000002,25000,-28550,53550,'2024-04-19 00:00:00','','2024-04-19 15:45:00','2024-04-19 15:47:00'),
(61,1,1,22,0000000001,5000,-980,5980,'2024-04-23 00:00:00','','2024-04-23 21:43:00','2024-04-23 21:43:00'),
(62,1,1,22,0000000001,1000,-4980,5980,'2024-04-23 00:00:00','','2024-04-23 21:44:00','2024-04-23 21:44:00'),
(63,1,1,82,0000000001,3000000,991875,2008125,'2024-04-24 00:00:00','','2024-04-24 18:51:00','2024-04-24 18:51:00'),
(64,1,1,82,0000000002,20008120,18000000,2008120,'2024-04-24 00:00:00','','2024-04-24 18:57:00','2024-04-24 18:57:00'),
(65,0,0,0,0000000000,500000,500000,500000,'2024-05-21 15:37:14','string','2024-05-21 15:37:14','2024-05-21 15:37:14');

/*Table structure for table `poscajapagosafavor` */

DROP TABLE IF EXISTS `poscajapagosafavor`;

CREATE TABLE `poscajapagosafavor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdCaja` int NOT NULL,
  `IdPos` int NOT NULL,
  `IdFactura` int NOT NULL,
  `IdPago` int NOT NULL,
  `SaldoAFavor` int NOT NULL,
  `Estado` int NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `poscajapagosafavor` */

insert  into `poscajapagosafavor`(`Id`,`IdCaja`,`IdPos`,`IdFactura`,`IdPago`,`SaldoAFavor`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,0,0,0,0,50,5,'2024-05-21 19:26:23','2024-05-21 19:26:23');

/*Table structure for table `posdevolucionproductovendido` */

DROP TABLE IF EXISTS `posdevolucionproductovendido`;

CREATE TABLE `posdevolucionproductovendido` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdPos` int NOT NULL,
  `IdFactura` int NOT NULL,
  `Nit` int NOT NULL,
  `RazonSocial` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Telefono` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Direccion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `CodigoProducto` int NOT NULL,
  `Motivo` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `FechaDevolucion` timestamp NOT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `posdevolucionproductovendido` */

insert  into `posdevolucionproductovendido`(`Id`,`IdPos`,`IdFactura`,`Nit`,`RazonSocial`,`Telefono`,`Direccion`,`CodigoProducto`,`Motivo`,`FechaDevolucion`,`User`,`CreatedAt`,`UpdatedAt`) values 
(1,1,1,73160918,'string','string','@corys90',1,'string','2024-05-21 21:06:58','string','2024-05-21 21:06:58','2024-05-21 21:06:58');

/*Table structure for table `posfacturadetalle` */

DROP TABLE IF EXISTS `posfacturadetalle`;

CREATE TABLE `posfacturadetalle` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdPos` int NOT NULL,
  `IdFactura` int NOT NULL,
  `CodigoProducto` int DEFAULT NULL,
  `Descripcion` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Cantidad` int DEFAULT NULL,
  `UnidadMedida` int DEFAULT NULL,
  `ValUnitario` int DEFAULT NULL,
  `Descuento` int DEFAULT NULL,
  `ValUnitarioDescuento` float DEFAULT NULL,
  `Iva` int DEFAULT NULL,
  `ValIva` float DEFAULT NULL,
  `SubTotal` float DEFAULT NULL,
  `Total` float DEFAULT NULL,
  `CreatedAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `posfacturadetalle` */

insert  into `posfacturadetalle`(`Id`,`IdPos`,`IdFactura`,`CodigoProducto`,`Descripcion`,`Cantidad`,`UnidadMedida`,`ValUnitario`,`Descuento`,`ValUnitarioDescuento`,`Iva`,`ValIva`,`SubTotal`,`Total`,`CreatedAt`,`UpdatedAt`) values 
(1,1,10,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-16 21:14:00','2024-04-16 21:14:00'),
(2,1,10,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-16 21:14:00','2024-04-16 21:14:00'),
(3,1,11,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 06:24:00','2024-04-17 06:24:00'),
(4,1,11,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 06:24:00','2024-04-17 06:24:00'),
(5,1,11,3,'Anillo Calamar V.',3,2,5500,19,3135,10,1336.5,13365,14701.5,'2024-04-17 06:24:00','2024-04-17 06:24:00'),
(6,1,12,3,'Anillo Calamar V.',3,2,5500,19,3135,10,1336.5,13365,14701.5,'2024-04-17 06:56:00','2024-04-17 06:56:00'),
(7,1,12,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 06:56:00','2024-04-17 06:56:00'),
(8,1,12,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 06:56:00','2024-04-17 06:56:00'),
(9,1,13,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 06:58:00','2024-04-17 06:58:00'),
(10,1,14,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 06:58:00','2024-04-17 06:58:00'),
(11,1,15,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 06:58:00','2024-04-17 06:58:00'),
(12,1,16,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 07:08:00','2024-04-17 07:08:00'),
(13,1,16,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 07:08:00','2024-04-17 07:08:00'),
(14,1,17,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 07:14:00','2024-04-17 07:14:00'),
(15,1,18,2,'Anillo de calamar',20,3,2500,8,4000,30,13800,46000,59800,'2024-04-17 07:23:00','2024-04-17 07:23:00'),
(16,1,19,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 07:24:00','2024-04-17 07:24:00'),
(17,1,20,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 07:26:00','2024-04-17 07:26:00'),
(18,1,21,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 07:28:00','2024-04-17 07:28:00'),
(19,1,22,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 07:48:00','2024-04-17 07:48:00'),
(20,1,23,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 07:48:00','2024-04-17 07:48:00'),
(21,1,24,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 08:13:00','2024-04-17 08:13:00'),
(22,1,25,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 08:20:00','2024-04-17 08:20:00'),
(23,1,26,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 08:38:00','2024-04-17 08:38:00'),
(24,1,27,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 08:45:00','2024-04-17 08:45:00'),
(25,1,28,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 08:45:00','2024-04-17 08:45:00'),
(26,1,29,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 08:47:00','2024-04-17 08:47:00'),
(27,1,30,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 08:47:00','2024-04-17 08:47:00'),
(28,1,31,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 08:47:00','2024-04-17 08:47:00'),
(29,1,32,2,'Anillo de calamar',4,3,2500,8,800,30,2760,9200,11960,'2024-04-17 09:05:00','2024-04-17 09:05:00'),
(30,1,33,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 09:08:00','2024-04-17 09:08:00'),
(31,1,34,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 20:54:00','2024-04-17 20:54:00'),
(32,1,35,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 20:54:00','2024-04-17 20:54:00'),
(33,1,36,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 20:54:00','2024-04-17 20:54:00'),
(34,1,37,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 20:54:00','2024-04-17 20:54:00'),
(35,1,38,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 21:28:00','2024-04-17 21:28:00'),
(36,1,39,1,'Almeja caribeña 2',20,1,12500,10,25000,19,42750,225000,267750,'2024-04-17 21:30:00','2024-04-17 21:30:00'),
(37,1,40,1,'Almeja caribeña 2',2,1,12500,10,2500,19,4275,22500,26775,'2024-04-17 21:33:00','2024-04-17 21:33:00'),
(38,1,41,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 21:55:00','2024-04-17 21:55:00'),
(39,1,42,1,'Almeja caribeña 2',0,1,12500,10,0,19,0,0,0,'2024-04-17 22:11:00','2024-04-17 22:11:00'),
(40,1,43,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 22:23:00','2024-04-17 22:23:00'),
(41,1,43,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 22:24:00','2024-04-17 22:24:00'),
(42,1,44,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 22:23:00','2024-04-17 22:23:00'),
(43,1,44,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-17 22:24:00','2024-04-17 22:24:00'),
(44,1,45,2,'Anillo de calamar',1,3,2500,8,200,30,690,2300,2990,'2024-04-17 22:26:00','2024-04-17 22:26:00'),
(45,1,45,1,'Almeja caribeña 2',2,1,12500,10,2500,19,4275,22500,26775,'2024-04-17 22:26:00','2024-04-17 22:26:00'),
(46,1,46,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 22:27:00','2024-04-17 22:27:00'),
(47,1,47,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-17 22:27:00','2024-04-17 22:27:00'),
(48,1,48,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 06:25:00','2024-04-18 06:25:00'),
(49,1,48,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-18 06:25:00','2024-04-18 06:25:00'),
(50,1,49,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 06:46:00','2024-04-18 06:46:00'),
(51,1,49,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(52,1,49,3,'Anillo Calamar V.',3,2,5500,19,3135,10,1336.5,13365,14701.5,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(53,1,50,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 06:46:00','2024-04-18 06:46:00'),
(54,1,50,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(55,1,50,3,'Anillo Calamar V.',3,2,5500,19,3135,10,1336.5,13365,14701.5,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(56,1,51,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 06:46:00','2024-04-18 06:46:00'),
(57,1,51,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(58,1,51,3,'Anillo Calamar V.',3,2,5500,19,3135,10,1336.5,13365,14701.5,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(59,1,52,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 06:46:00','2024-04-18 06:46:00'),
(60,1,52,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(61,1,52,3,'Anillo Calamar V.',3,2,5500,19,3135,10,1336.5,13365,14701.5,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(62,1,53,3,'Anillo Calamar V.',1,2,5500,19,1045,10,445.5,4455,4900.5,'2024-04-18 06:50:00','2024-04-18 06:50:00'),
(63,1,54,3,'Anillo Calamar V.',1,2,5500,19,1045,10,445.5,4455,4900.5,'2024-04-18 06:50:00','2024-04-18 06:50:00'),
(64,1,55,3,'Anillo Calamar V.',1,2,5500,19,1045,10,445.5,4455,4900.5,'2024-04-18 06:50:00','2024-04-18 06:50:00'),
(65,1,56,3,'Anillo Calamar V.',1,2,5500,19,1045,10,445.5,4455,4900.5,'2024-04-18 07:05:00','2024-04-18 07:05:00'),
(66,0,57,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 13:06:00','2024-04-18 13:06:00'),
(67,1,58,3,'Anillo Calamar V.',1,2,5500,19,1045,10,445.5,4455,4900.5,'2024-04-18 13:15:00','2024-04-18 13:15:00'),
(68,1,58,1,'Almeja caribeña 2',10,1,12500,10,12500,19,21375,112500,133875,'2024-04-18 13:15:00','2024-04-18 13:15:00'),
(69,1,59,1,'Almeja caribeña 2',10,1,12500,10,12500,19,21375,112500,133875,'2024-04-18 13:21:00','2024-04-18 13:21:00'),
(70,1,59,2,'Anillo de calamar',20,3,2500,8,4000,30,13800,46000,59800,'2024-04-18 13:21:00','2024-04-18 13:21:00'),
(71,1,59,3,'Anillo Calamar V.',30,2,5500,19,31350,10,13365,133650,147015,'2024-04-18 13:21:00','2024-04-18 13:21:00'),
(72,1,60,3,'Anillo Calamar V.',3,2,5500,19,3135,10,1336.5,13365,14701.5,'2024-04-18 13:50:00','2024-04-18 13:50:00'),
(73,1,60,2,'Anillo de calamar',2,3,2500,8,400,30,1380,4600,5980,'2024-04-18 13:50:00','2024-04-18 13:50:00'),
(74,1,60,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 13:50:00','2024-04-18 13:50:00'),
(75,1,61,2,'Anillo de calamar',50,3,2500,8,10000,30,34500,115000,149500,'2024-04-18 20:13:00','2024-04-18 20:13:00'),
(76,1,62,1,'Almeja caribeña 2',100,1,12500,10,125000,19,213750,1125000,1338750,'2024-04-18 20:14:00','2024-04-18 20:14:00'),
(77,1,63,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 20:46:00','2024-04-18 20:46:00'),
(78,1,64,1,'Almeja caribeña 2',50,1,12500,10,62500,19,106875,562500,669375,'2024-04-18 20:49:00','2024-04-18 20:49:00'),
(79,1,65,1,'Almeja caribeña 2',23,1,12500,10,28750,19,49162.5,258750,307912,'2024-04-18 21:20:00','2024-04-18 21:20:00'),
(80,3,66,2,'Anillo de calamar',250,3,2500,8,50000,30,172500,575000,747500,'2024-04-18 21:21:00','2024-04-18 21:21:00'),
(81,1,67,3,'Anillo Calamar V.',30,2,5500,19,31350,10,13365,133650,147015,'2024-04-18 21:31:00','2024-04-18 21:31:00'),
(82,2,68,3,'Anillo Calamar V.',20,2,5500,19,20900,10,8910,89100,98010,'2024-04-18 21:32:00','2024-04-18 21:32:00'),
(83,2,68,1,'Almeja caribeña 2',30,1,12500,10,37500,19,64125,337500,401625,'2024-04-18 21:32:00','2024-04-18 21:32:00'),
(84,1,69,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 21:36:00','2024-04-18 21:36:00'),
(85,1,70,1,'Almeja caribeña 2',2,1,12500,10,2500,19,4275,22500,26775,'2024-04-18 21:41:00','2024-04-18 21:41:00'),
(86,1,71,1,'Almeja caribeña 2',4,1,12500,10,5000,19,8550,45000,53550,'2024-04-18 21:42:00','2024-04-18 21:42:00'),
(87,1,72,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-18 21:52:00','2024-04-18 21:52:00'),
(88,1,73,1,'Almeja caribeña 2',23,1,12500,10,28750,19,49162.5,258750,307912,'2024-04-18 22:08:00','2024-04-18 22:08:00'),
(89,1,74,1,'Almeja caribeña 2',10,1,12500,10,12500,19,21375,112500,133875,'2024-04-19 06:18:00','2024-04-19 06:18:00'),
(90,2,75,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-19 06:31:00','2024-04-19 06:31:00'),
(91,2,76,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-19 06:43:00','2024-04-19 06:43:00'),
(92,1,77,1,'Almeja caribeña 2',2,1,12500,10,2500,19,4275,22500,26775,'2024-04-19 06:45:00','2024-04-19 06:45:00'),
(93,1,78,1,'Almeja caribeña 2',10,1,12500,10,12500,19,21375,112500,133875,'2024-04-19 06:52:00','2024-04-19 06:52:00'),
(94,1,79,1,'Almeja caribeña 2',1,1,12500,10,1250,19,2137.5,11250,13387.5,'2024-04-19 07:21:00','2024-04-19 07:21:00'),
(95,1,80,1,'Almeja caribeña 2',4,1,12500,10,5000,19,8550,45000,53550,'2024-04-19 15:44:00','2024-04-19 15:44:00'),
(96,2,81,1,'Almeja caribeña 2',10,1,12500,10,12500,19,21375,112500,133875,'2024-04-24 18:45:00','2024-04-24 18:45:00'),
(97,2,81,4,'Combo 1',5,7,3500,10,1750,20,3150,15750,18900,'2024-04-24 18:46:00','2024-04-24 18:46:00'),
(98,1,82,1,'Almeja caribeña 2',150,1,12500,10,187500,19,320625,1687500,2008120,'2024-04-24 18:48:00','2024-04-24 18:48:00');

/*Table structure for table `posfacturas` */

DROP TABLE IF EXISTS `posfacturas`;

CREATE TABLE `posfacturas` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdPos` int NOT NULL,
  `IdFactura` int NOT NULL,
  `RazonSocial` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Nit` int NOT NULL DEFAULT (0),
  `TipoCliente` int NOT NULL,
  `Concepto` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Direccion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Ciudad` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Telefono` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `FechaFactura` timestamp NOT NULL,
  `FechaVencimiento` timestamp NOT NULL,
  `FormaPago` int NOT NULL,
  `IdVendedor` int NOT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `SubTotal` float NOT NULL,
  `Descuento` int NOT NULL,
  `Iva` float NOT NULL,
  `TotalOprecaion` float NOT NULL,
  `Retefuente` float NOT NULL,
  `ReteIca` float NOT NULL,
  `Total` float NOT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `posfacturas` */

insert  into `posfacturas`(`Id`,`IdPos`,`IdFactura`,`RazonSocial`,`Nit`,`TipoCliente`,`Concepto`,`Direccion`,`Ciudad`,`Telefono`,`FechaFactura`,`FechaVencimiento`,`FormaPago`,`IdVendedor`,`User`,`SubTotal`,`Descuento`,`Iva`,`TotalOprecaion`,`Retefuente`,`ReteIca`,`Total`,`CreatedAt`,`UpdatedAt`) values 
(2,1,2,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:15:00','2024-04-16 20:15:00'),
(3,1,3,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:15:00','2024-04-16 20:15:00'),
(4,1,4,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:26:00','2024-04-16 20:26:00'),
(5,1,5,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:26:00','2024-04-16 20:26:00'),
(6,1,6,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:26:00','2024-04-16 20:26:00'),
(7,1,7,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:26:00','2024-04-16 20:26:00'),
(8,1,8,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:26:00','2024-04-16 20:26:00'),
(9,1,9,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-16 20:26:00','2024-04-16 20:26:00'),
(10,1,10,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-16 00:00:00','2024-04-17 00:00:00',0,4,'',15850,1650,3517.5,19367.5,0,0,19367.5,'2024-04-16 21:14:00','2024-04-16 21:14:00'),
(11,1,11,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,2,'',29215,4785,4854,34069,0,0,34069,'2024-04-17 06:25:00','2024-04-17 06:25:00'),
(12,1,12,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',29215,4785,4854,34069,0,0,34069,'2024-04-17 06:56:00','2024-04-17 06:56:00'),
(13,1,13,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 06:58:00','2024-04-17 06:58:00'),
(14,1,14,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 07:01:00','2024-04-17 07:01:00'),
(15,1,15,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 07:03:00','2024-04-17 07:03:00'),
(16,1,16,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,2,'',15850,1650,3517.5,19367.5,0,0,19367.5,'2024-04-17 07:08:00','2024-04-17 07:08:00'),
(17,1,17,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',2300,200,690,2990,0,0,2990,'2024-04-17 07:14:00','2024-04-17 07:14:00'),
(18,1,18,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',46000,4000,13800,59800,0,0,59800,'2024-04-17 07:23:00','2024-04-17 07:23:00'),
(19,1,19,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',2300,200,690,2990,0,0,2990,'2024-04-17 07:24:00','2024-04-17 07:24:00'),
(20,1,20,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',2300,200,690,2990,0,0,2990,'2024-04-17 07:26:00','2024-04-17 07:26:00'),
(21,1,21,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 07:28:00','2024-04-17 07:28:00'),
(22,1,22,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 07:48:00','2024-04-17 07:48:00'),
(23,1,23,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 07:48:00','2024-04-17 07:48:00'),
(24,1,24,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',2300,200,690,2990,0,0,2990,'2024-04-17 08:13:00','2024-04-17 08:13:00'),
(25,1,25,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',2300,200,690,2990,0,0,2990,'2024-04-17 08:20:00','2024-04-17 08:20:00'),
(26,1,26,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 08:38:00','2024-04-17 08:38:00'),
(27,1,27,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',2300,200,690,2990,0,0,2990,'2024-04-17 08:45:00','2024-04-17 08:45:00'),
(28,1,28,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',2300,200,690,2990,0,0,2990,'2024-04-17 08:46:00','2024-04-17 08:46:00'),
(29,1,29,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 08:47:00','2024-04-17 08:47:00'),
(30,1,30,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 08:47:00','2024-04-17 08:47:00'),
(31,1,31,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 08:57:00','2024-04-17 08:57:00'),
(32,1,32,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',9200,800,2760,11960,0,0,11960,'2024-04-17 09:05:00','2024-04-17 09:05:00'),
(33,1,33,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',4600,400,1380,5980,0,0,5980,'2024-04-17 09:08:00','2024-04-17 09:08:00'),
(34,1,34,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 20:54:00','2024-04-17 20:54:00'),
(35,1,35,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 21:18:00','2024-04-17 21:18:00'),
(36,1,36,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 21:18:00','2024-04-17 21:18:00'),
(37,1,37,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 21:18:00','2024-04-17 21:18:00'),
(38,1,38,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 21:28:00','2024-04-17 21:28:00'),
(39,1,39,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',225000,25000,42750,267750,0,0,267750,'2024-04-17 21:30:00','2024-04-17 21:30:00'),
(40,1,40,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',22500,2500,4275,26775,0,0,26775,'2024-04-17 21:33:00','2024-04-17 21:33:00'),
(41,1,41,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 21:55:00','2024-04-17 21:55:00'),
(42,1,42,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',0,0,0,0,0,0,0,'2024-04-17 22:11:00','2024-04-17 22:11:00'),
(43,1,43,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',15850,1650,3517.5,19367.5,0,0,19367.5,'2024-04-17 22:24:00','2024-04-17 22:24:00'),
(44,1,44,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',15850,1650,3517.5,19367.5,0,0,19367.5,'2024-04-17 22:25:00','2024-04-17 22:25:00'),
(45,1,45,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',24800,2700,4965,29765,0,0,29765,'2024-04-17 22:26:00','2024-04-17 22:26:00'),
(46,1,46,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 22:27:00','2024-04-17 22:27:00'),
(47,1,47,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-17 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-17 22:27:00','2024-04-17 22:27:00'),
(48,1,48,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',15850,1650,3517.5,19367.5,0,0,19367.5,'2024-04-18 06:25:00','2024-04-18 06:25:00'),
(49,1,49,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',29215,4785,4854,34069,0,0,34069,'2024-04-18 06:47:00','2024-04-18 06:47:00'),
(50,1,50,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',29215,4785,4854,34069,0,0,34069,'2024-04-18 06:48:00','2024-04-18 06:48:00'),
(51,1,51,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',29215,4785,4854,34069,0,0,34069,'2024-04-18 06:49:00','2024-04-18 06:49:00'),
(52,1,52,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',29215,4785,4854,34069,0,0,34069,'2024-04-18 06:50:00','2024-04-18 06:50:00'),
(53,1,53,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',4455,1045,445.5,4900.5,0,0,4900.5,'2024-04-18 06:50:00','2024-04-18 06:50:00'),
(54,1,54,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',4455,1045,445.5,4900.5,0,0,4900.5,'2024-04-18 06:51:00','2024-04-18 06:51:00'),
(55,1,55,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',4455,1045,445.5,4900.5,0,0,4900.5,'2024-04-18 06:51:00','2024-04-18 06:51:00'),
(56,1,56,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',4455,1045,445.5,4900.5,0,0,4900.5,'2024-04-18 07:05:00','2024-04-18 07:05:00'),
(57,1,57,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-18 13:06:00','2024-04-18 13:06:00'),
(58,1,58,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-19 00:00:00',0,6,'',116955,13545,21820.5,138776,0,0,138776,'2024-04-18 13:15:00','2024-04-18 13:15:00'),
(59,1,59,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,4,'',292150,47850,48540,340690,0,0,340690,'2024-04-18 13:21:00','2024-04-18 13:21:00'),
(60,1,60,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,4,'',29215,4785,4854,34069,0,0,34069,'2024-04-18 13:50:00','2024-04-18 13:50:00'),
(61,1,61,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,4,'',115000,10000,34500,149500,0,0,149500,'2024-04-18 20:13:00','2024-04-18 20:13:00'),
(62,1,62,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,4,'',1125000,125000,213750,1338750,0,0,1338750,'2024-04-18 20:14:00','2024-04-18 20:14:00'),
(63,1,63,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,5,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-18 20:46:00','2024-04-18 20:46:00'),
(64,1,64,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,6,'',562500,62500,106875,669375,0,0,669375,'2024-04-18 20:49:00','2024-04-18 20:49:00'),
(65,1,65,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,3,'',258750,28750,49162.5,307912,0,0,307912,'2024-04-18 21:20:00','2024-04-18 21:20:00'),
(66,3,66,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-30 00:00:00',0,6,'',575000,50000,172500,747500,0,0,747500,'2024-04-18 21:21:00','2024-04-18 21:21:00'),
(67,1,67,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-18 00:00:00',0,5,'',133650,31350,13365,147015,0,0,147015,'2024-04-18 21:31:00','2024-04-18 21:31:00'),
(68,2,68,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-18 00:00:00',0,3,'',426600,58400,73035,499635,0,0,499635,'2024-04-18 21:32:00','2024-04-18 21:32:00'),
(69,1,69,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-18 00:00:00',0,4,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-18 21:36:00','2024-04-18 21:36:00'),
(70,1,70,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-18 00:00:00',0,3,'',22500,2500,4275,26775,0,0,26775,'2024-04-18 21:41:00','2024-04-18 21:41:00'),
(71,1,71,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-18 00:00:00',0,3,'',45000,5000,8550,53550,0,0,53550,'2024-04-18 21:42:00','2024-04-18 21:42:00'),
(72,1,72,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-18 00:00:00',0,3,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-18 21:52:00','2024-04-18 21:52:00'),
(73,1,73,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-18 00:00:00','2024-04-18 00:00:00',0,4,'',258750,28750,49162.5,307912,0,0,307912,'2024-04-18 22:08:00','2024-04-18 22:08:00'),
(74,1,74,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-19 00:00:00','2024-04-20 00:00:00',0,6,'',112500,12500,21375,133875,0,0,133875,'2024-04-19 06:18:00','2024-04-19 06:18:00'),
(75,2,75,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-19 00:00:00','2024-04-20 00:00:00',0,3,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-19 06:31:00','2024-04-19 06:31:00'),
(76,2,76,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-19 00:00:00','2024-04-20 00:00:00',0,5,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-19 06:43:00','2024-04-19 06:43:00'),
(77,1,77,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-19 00:00:00','2024-04-20 00:00:00',0,2,'',22500,2500,4275,26775,0,0,26775,'2024-04-19 06:45:00','2024-04-19 06:45:00'),
(78,1,78,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-19 00:00:00','2024-04-20 00:00:00',0,4,'',112500,12500,21375,133875,0,0,133875,'2024-04-19 06:52:00','2024-04-19 06:52:00'),
(79,1,79,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-19 00:00:00','2024-04-20 00:00:00',0,3,'',11250,1250,2137.5,13387.5,0,0,13387.5,'2024-04-19 07:21:00','2024-04-19 07:21:00'),
(80,1,80,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-19 00:00:00','2024-04-20 00:00:00',0,5,'',45000,5000,8550,53550,0,0,53550,'2024-04-19 15:44:00','2024-04-19 15:44:00'),
(81,2,81,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-24 00:00:00','2024-04-26 00:00:00',0,4,'',128250,14250,24525,152775,0,0,152775,'2024-04-24 18:46:00','2024-04-24 18:46:00'),
(82,1,82,'Cristian A. Cortes Sarmiento',73160918,1,'Venta de productos','Urbanización Sta Clara Mz O Lote 17','Cartagena','3003189265','2024-04-24 00:00:00','2024-04-26 00:00:00',0,3,'',1687500,187500,320625,2008120,0,0,2008120,'2024-04-24 18:48:00','2024-04-24 18:48:00');

/*Table structure for table `posinventarioproductos` */

DROP TABLE IF EXISTS `posinventarioproductos`;

CREATE TABLE `posinventarioproductos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdPos` int NOT NULL,
  `IdCodigo` int NOT NULL,
  `TipoProducto` int NOT NULL,
  `IdProductoCompuesto` int NOT NULL,
  `Nombre` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Descripcion` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Cantidad` float DEFAULT NULL,
  `StockMinimo` int DEFAULT NULL,
  `UnidadMedida` int DEFAULT NULL,
  `Lote` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Olor` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Color` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Textura` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Tamano` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Peso` float DEFAULT NULL,
  `Embalaje` int DEFAULT NULL,
  `Temperatura` float DEFAULT NULL,
  `ValorUnitario` int DEFAULT NULL,
  `Descuento` float DEFAULT NULL,
  `Impuesto` float DEFAULT NULL,
  `ValorIva` float DEFAULT NULL,
  `FechaCreacion` timestamp NULL DEFAULT NULL,
  `DiasVencimiento` int DEFAULT NULL,
  `FechaVencimiento` timestamp NULL DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `posinventarioproductos` */

insert  into `posinventarioproductos`(`Id`,`IdPos`,`IdCodigo`,`TipoProducto`,`IdProductoCompuesto`,`Nombre`,`Descripcion`,`Cantidad`,`StockMinimo`,`UnidadMedida`,`Lote`,`Olor`,`Color`,`Textura`,`Tamano`,`Peso`,`Embalaje`,`Temperatura`,`ValorUnitario`,`Descuento`,`Impuesto`,`ValorIva`,`FechaCreacion`,`DiasVencimiento`,`FechaVencimiento`,`User`,`CreatedAt`,`UpdatedAt`) values 
(1,3,1,4,1,'Almeja','Almeja caribeña 2',340,500,2,'123','Normal','Café','Normal','123',123,3,123,12500,10,19,0,'2024-01-25 00:00:00',150,'2024-05-26 23:10:00','Corys90','2024-01-25 14:54:21','2024-01-25 14:54:23'),
(2,2,2,2,2,'Anillo Calamar','Anillo de calamar',250,10,3,'2','Normal','Blanco','Normal',NULL,250,3,15,2500,8,30,0,'2024-01-25 14:59:50',90,'2024-01-25 14:59:56','Corys90','2024-01-25 15:00:02','2024-01-25 15:00:03'),
(3,2,4,2,3,'Combo 1','Combo 1',100,10,7,'3','Normal','Sin Color','Normal',NULL,5000,2,15,3500,10,20,0,'2024-01-25 15:03:58',180,'2024-01-25 15:04:08','Corys90','2024-01-25 15:04:14','2024-01-25 15:04:16'),
(4,2,3,1,1,'Anillo calamar V.','Anillo Calamar V.',150,10,2,'4','Normal','Balnco','Normal',NULL,200,1,15,5500,19,10,0,'2024-01-25 16:10:36',90,'2024-01-25 16:10:41','Corys90','2024-01-25 16:10:45','2024-01-25 16:10:47'),
(6,1,5,1,4,'Ostras','Ostras de rio',20,0,0,'','','','','',0,4,0,5365,0,0,NULL,'2024-03-25 20:19:00',0,'2024-03-25 20:19:00',NULL,'2024-03-25 20:19:00',NULL),
(7,3,6,1,4,'Cristian A.','Producto personal',200,5,1,'1','Normal','rojo','Normal','16',250,3,10,5000,0,19,NULL,'2024-05-26 15:39:00',60,'2024-05-26 15:39:00',NULL,'2024-05-26 15:39:00',NULL),
(8,1,1,1,1,'string','string',19,0,0,'string','string','string','string','string',0,0,0,0,0,0,0,'2024-05-31 03:25:09',0,'2024-05-31 03:25:09','string','2024-05-31 03:25:09','2024-05-31 03:25:09');

/*Table structure for table `posmovimientoinventario` */

DROP TABLE IF EXISTS `posmovimientoinventario`;

CREATE TABLE `posmovimientoinventario` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `idPos` int DEFAULT NULL,
  `idCodigo` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  `fechaMovimiento` timestamp NULL DEFAULT NULL,
  `user` varchar(16) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `posmovimientoinventario` */

insert  into `posmovimientoinventario`(`Id`,`idPos`,`idCodigo`,`cantidad`,`fechaMovimiento`,`user`,`createdAt`,`updatedAt`) values 
(1,1,1,100,'2024-05-29 21:02:00','','2024-05-29','2024-05-29'),
(2,1,2,4,'2024-05-29 22:07:00','','2024-05-29','2024-05-29'),
(3,2,2,50,'2024-05-29 22:20:00','','2024-05-29','2024-05-29'),
(4,3,5,99,'2024-05-30 07:17:00','','2024-05-30','2024-05-30'),
(5,3,6,100,'2024-05-30 11:00:00','','2024-05-30','2024-05-30'),
(6,2,4,5,'2024-05-30 11:00:00','','2024-05-30','2024-05-30'),
(7,1,4,5,'2024-05-30 11:00:00','','2024-05-30','2024-05-30'),
(8,1,1,10,'2024-05-30 11:45:00','','2024-05-30','2024-05-30'),
(9,1,1,10,'2024-05-30 11:47:00','','2024-05-30','2024-05-30'),
(10,1,1,10,'2024-05-30 11:47:00','','2024-05-30','2024-05-30'),
(11,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(12,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(13,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(14,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(15,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(16,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(17,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(18,1,1,10,'2024-05-30 13:10:00','','2024-05-30','2024-05-30'),
(19,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(20,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(21,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(22,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(23,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(24,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(25,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(26,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(27,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(28,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(29,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(30,1,1,10,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(31,1,1,9,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(32,1,1,9,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(33,1,1,9,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(34,1,1,9,'2024-05-30 13:38:00','','2024-05-30','2024-05-30'),
(35,1,5,9,'2024-05-30 14:58:00','','2024-05-30','2024-05-30'),
(36,1,1,9,'2024-05-30 14:58:00','','2024-05-30','2024-05-30'),
(37,1,1,9,'2024-05-30 14:58:00','','2024-05-30','2024-05-30'),
(38,1,1,9,'2024-05-30 14:58:00','','2024-05-30','2024-05-30'),
(39,1,1,9,'2024-05-30 16:01:00','','2024-05-30','2024-05-30'),
(40,1,5,10,'2024-05-30 21:20:47','string','2024-05-30','2024-05-30'),
(41,1,1,10,'2024-05-30 21:20:47','string','2024-05-30','2024-05-30'),
(42,1,1,10,'2024-05-30 21:23:28','string','2024-05-30','2024-05-30'),
(43,1,1,15,'2024-05-30 21:25:23','string','2024-05-30','2024-05-30'),
(44,1,1,9,'2024-05-31 06:45:00','','2024-05-31','2024-05-31'),
(45,1,2,15,'2024-05-31 06:45:00','','2024-05-31','2024-05-31'),
(46,1,2,20,'2024-05-31 06:45:00','','2024-05-31','2024-05-31'),
(47,1,2,10,'2024-05-31 07:05:00','','2024-05-31','2024-05-31');

/*Table structure for table `posproductocompuesto` */

DROP TABLE IF EXISTS `posproductocompuesto`;

CREATE TABLE `posproductocompuesto` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `posproductocompuesto` */

insert  into `posproductocompuesto`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'Combo Blanco','Marlin 1kg, Camaron 1kg, Basa 1kg','corys90',00000,'2024-02-26 12:48:01','2024-02-26 12:48:01'),
(2,'Combo Rojo','Pargo 1kg, Otro 1kg, Atun 1kg, y otra más...','@corys90',00000,'2024-02-26 12:48:01','2024-02-26 12:48:01'),
(3,'Combo Rosado','Carnes Rosadas de 2 kilos en cada porción','Corys90',00000,'2024-03-17 13:32:00','2024-03-17 13:32:00'),
(4,'Único','Prodcuto Compuesto por un solo componente','Corys90',00000,'2024-04-01 16:05:47','2024-03-25 16:05:56');

/*Table structure for table `postipoembalaje` */

DROP TABLE IF EXISTS `postipoembalaje`;

CREATE TABLE `postipoembalaje` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `postipoembalaje` */

insert  into `postipoembalaje`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'Lata','Latas','Corys90',00000,'2024-01-25 14:40:01','2024-04-24 10:22:00'),
(2,'Canasta','Canasta','Corys90',00000,'2024-01-25 14:40:16','2024-01-25 14:40:17'),
(3,'Caja','Caja','Corys90',00000,'2024-01-25 14:40:33','2024-01-25 14:40:34'),
(4,'Saco','Saco','Corys90',00000,'2024-01-25 14:40:47','2024-01-25 14:40:48'),
(5,'Bolsa','Bolsa plástica','Corys90',00000,'2024-02-28 17:51:57','2024-02-28 17:51:57'),
(8,'Tambor','Tambor embarcado','Corys90',00000,'2024-02-26 13:58:05','2024-02-26 13:58:05'),
(10,'Cnt22','Container 22 pies','',00000,'2024-03-15 19:09:00','2024-03-15 19:09:00'),
(11,'Cnt40','Container 40 pies','',00000,'2024-03-15 19:16:00','2024-03-15 19:16:00');

/*Table structure for table `postipoestadocaja` */

DROP TABLE IF EXISTS `postipoestadocaja`;

CREATE TABLE `postipoestadocaja` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `postipoestadocaja` */

insert  into `postipoestadocaja`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'string','Cristian','Corys90',00000,'2024-02-26 03:24:48','2024-02-26 03:24:48'),
(2,'Inactivo','No activo','@corys90',00001,'2024-02-26 03:23:43','2024-02-26 03:23:43'),
(3,'Suspendido','No Suspendido','Corys90',00000,'2024-02-26 03:23:43','2024-02-26 03:23:43'),
(5,'Otro','Otro estado sin definir','',00000,'2024-03-17 14:55:00','2024-03-17 14:56:00'),
(6,'N.A.','No aplica - N.A.','',00000,'2024-03-17 14:57:00','2024-03-17 14:57:00');

/*Table structure for table `postipoestadoposcaja` */

DROP TABLE IF EXISTS `postipoestadoposcaja`;

CREATE TABLE `postipoestadoposcaja` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

/*Data for the table `postipoestadoposcaja` */

insert  into `postipoestadoposcaja`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'Inactivo','123456789abcdefghijklmnopqrstuvwxyz','@corys90@hotmail',00000,'2024-01-25 11:40:22','2024-01-25 11:40:24'),
(2,'Activo','Caja funcional','Corys90',00000,'2024-01-25 11:40:12','2024-01-25 11:40:17'),
(3,'Otro','Otro estado no definido','Corys90',00000,'2024-01-25 11:40:59','2024-01-25 11:41:01'),
(5,'Nuevo','string','Yo',00000,'2024-02-25 05:58:40','2024-02-25 05:58:40'),
(6,'Prueba','Ninguna prueba','@Corys90',00000,'2024-02-25 16:00:47','2024-03-17 13:57:00'),
(7,'string','Prueba con nombre string','Corys90',00000,'2024-02-25 19:48:46','2024-02-25 19:48:46'),
(8,'Octava','octava','corys90',00000,'2024-02-25 19:48:46','2024-02-25 19:48:46'),
(10,'Sin estado','Sin estados o estados no definidos','',00000,'2024-03-17 13:53:00','2024-03-17 13:55:00');

/*Table structure for table `postipoidcliente` */

DROP TABLE IF EXISTS `postipoidcliente`;

CREATE TABLE `postipoidcliente` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `postipoidcliente` */

insert  into `postipoidcliente`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'C.C.','Cédula de Ciudadanía','',00000,'2024-03-15 08:57:00','2024-03-17 09:45:00'),
(2,'NIT','Número Identificación Tributaria','',00000,'2024-03-15 09:42:00','2024-03-15 09:42:00'),
(3,'C.E.','Cédula de Extranjería','',00000,'2024-03-15 10:23:00','2024-03-15 10:23:00'),
(4,'T.I.','Tarjeta de Identidad','',00000,'2024-03-15 11:11:00','2024-03-15 11:11:00'),
(5,'R.C.','Registro Civil','',00000,'2024-03-15 11:12:00','2024-03-15 11:12:00'),
(6,'P.P.','Pasaporte','',00000,'2024-03-15 11:12:00','2024-03-15 11:12:00'),
(7,'D.N.','Documento Nacional de Identidad','',00000,'2024-03-15 11:13:00','2024-03-15 11:13:00'),
(8,'Otro','Otra identificación','',00000,'2024-03-15 14:26:00','2024-03-15 14:26:00');

/*Table structure for table `postipopagosafavor` */

DROP TABLE IF EXISTS `postipopagosafavor`;

CREATE TABLE `postipopagosafavor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `postipopagosafavor` */

insert  into `postipopagosafavor`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'Pagada','Deuda pagada','corys90',00000,'2024-02-26 03:50:17','2024-02-26 03:50:17'),
(2,'Adeudada','Adeudada','corys90',00000,'2024-02-26 03:50:17','2024-02-26 03:50:17'),
(3,'Suspendida','Estado de pagos en suspensión','',00000,'2024-03-17 12:16:00','2024-03-17 12:28:00');

/*Table structure for table `postipoproducto` */

DROP TABLE IF EXISTS `postipoproducto`;

CREATE TABLE `postipoproducto` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `postipoproducto` */

insert  into `postipoproducto`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'Sencillo','Producto unitario o de un solo articulo','Corys90',00000,'2024-01-25 14:28:45','2024-04-24 10:20:00'),
(2,'Compuesto','Producto compuesto por varios artículos','Corys90',00000,'2024-01-25 14:28:48','2024-01-25 14:28:49'),
(3,'Mixto','Producto de varios compuestos','Corys90',00000,'2024-02-26 11:59:30','2024-02-26 11:59:30'),
(4,'Ninguno','Ninguno ','',00000,'2024-03-17 10:42:00','2024-03-17 10:43:00');

/*Table structure for table `posunidadesmedida` */

DROP TABLE IF EXISTS `posunidadesmedida`;

CREATE TABLE `posunidadesmedida` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Estado` smallint(5) unsigned zerofill NOT NULL DEFAULT '00000',
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `posunidadesmedida` */

insert  into `posunidadesmedida`(`Id`,`Nombre`,`Descripcion`,`User`,`Estado`,`CreatedAt`,`UpdatedAt`) values 
(1,'Unitario','Producto único','Corys90',00000,'2024-01-25 14:32:25','2024-01-25 14:32:26'),
(2,'Kg','Kilogramos','Corys90',00000,'2024-01-25 14:33:09','2024-04-24 10:23:00'),
(3,'Bolsa','Bolsa','Corys90',00000,'2024-01-25 14:33:40','2024-01-25 14:33:41'),
(4,'Botella','Botella','Corys90',00000,'2024-01-25 14:34:01','2024-01-25 14:34:02'),
(5,'Tambor','Tambor','Corys90',00000,'2024-01-25 14:34:22','2024-01-25 14:34:23'),
(6,'Canasta','Canasta','Corys90',00000,'2024-01-25 14:34:41','2024-01-25 14:34:42'),
(7,'Combo','Combo','Corys90',00000,'2024-01-25 14:36:08','2024-01-25 14:36:09'),
(8,'Tamaño','Tamaño','Corys90',00000,'2024-01-25 14:39:23','2024-01-25 14:39:24'),
(9,'Granel','Granel','Corys90',00000,'2024-01-25 14:42:59','2024-01-25 14:43:01'),
(10,'Galón','Galón 1.8 litros','Virtual',00000,'2024-01-25 14:42:59','2024-01-25 14:43:01'),
(11,'Pliego','Pliegos de 21  pulgadas','',00000,'2024-03-17 12:58:00','2024-03-17 12:58:00');

/*Table structure for table `posvendedor` */

DROP TABLE IF EXISTS `posvendedor`;

CREATE TABLE `posvendedor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `IdVendedor` int NOT NULL,
  `TipoIdVendedor` int NOT NULL,
  `Nombres` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Apellidos` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Direccion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Telefono` varchar(64) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Email` varchar(128) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Ciudad` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Estado` int DEFAULT NULL,
  `Dpto` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `User` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CreatedAt` timestamp NOT NULL,
  `UpdatedAt` timestamp NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `posvendedor` */

insert  into `posvendedor`(`Id`,`IdVendedor`,`TipoIdVendedor`,`Nombres`,`Apellidos`,`Direccion`,`Telefono`,`Email`,`Ciudad`,`Estado`,`Dpto`,`User`,`CreatedAt`,`UpdatedAt`) values 
(2,73160918,1,' Cristian Alberto','Cortes Sarmiento','Urbanización Santa Clara MZ O lote 17','3003189265','Corys90@hotmail.com','Cartagena',0,'Bolívar','virtual','2024-03-12 12:33:30','2024-03-17 20:42:00'),
(3,73160918,2,'Luis ','perez','Urbanización Santa Clara Mz O lLote 17','+573003189265','corys90@hotmail.com','Cartagena',0,'Bolívar','','2024-03-17 20:46:00','2024-03-17 20:46:00'),
(4,73160918,4,'Cristian','Cortes Sarmiento','Urbanización Santa Clara Mz O lote 17','+573003189265','corys90@gmail.com','Barranquilla',0,'Bolívar','','2024-03-17 20:57:00','2024-03-18 07:12:00'),
(5,73160918,3,'Raul','Lara','Urbanización Santa Clara Mz O lote 17','+573003189265','corys90@gmail.com','Cartagena',0,'Bolívar','','2024-03-18 07:11:00','2024-03-18 07:11:00'),
(6,0,0,'Cristian','Cortes Sarmiento','Urbanización Santa Clara Mz O lote 17','+573003189265','corys90@hotmail.com','Cartagena, Cartagena Province, Bolivar, Colombia',0,'Bolívar','','2024-03-18 13:58:00','2024-03-18 13:58:00');

/*Table structure for table `sedepos` */

DROP TABLE IF EXISTS `sedepos`;

CREATE TABLE `sedepos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `Descripcion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Direccion` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `Longitud` float DEFAULT NULL,
  `Latitud` float DEFAULT NULL,
  `Estado` int NOT NULL,
  `User` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT NULL,
  `UpdatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci ROW_FORMAT=DYNAMIC;

/*Data for the table `sedepos` */

insert  into `sedepos`(`Id`,`Nombre`,`Descripcion`,`Direccion`,`Longitud`,`Latitud`,`Estado`,`User`,`CreatedAt`,`UpdatedAt`) values 
(1,'P.O.S. Bazurto','Compezcado Sector Bazurto','Sector central bazurto cerca a la avenida del lado',0.0123646,-1.23655,0,'Corys90','2024-01-25 11:40:22','2024-03-17 18:23:00'),
(2,'P.O.S. Primax','Compezcado Sector Prado, E.D.S. Prado','Sector el prado, Martinez Martelo',0.15237,-1.32515,0,'Corys90','2024-01-25 11:40:12','2024-03-17 18:24:00'),
(3,'P.O.S. Central','Sede Central','Sede Central',0,0,0,'','2024-03-17 18:31:00','2024-04-24 09:43:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
