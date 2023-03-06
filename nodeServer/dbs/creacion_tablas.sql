-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fusion_interno
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fusion_interno
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fusion_interno` DEFAULT CHARACTER SET utf8 ;
USE `fusion_interno` ;

-- -----------------------------------------------------
-- Table `fusion_interno`.`Herrajes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fusion_interno`.`Herrajes` (
  `id_herrajes` INT NOT NULL,
  `Nombre` VARCHAR(255) NOT NULL,
  `Marca` VARCHAR(255) NULL,
  `Stock` INT NOT NULL,
  PRIMARY KEY (`id_herrajes`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fusion_interno`.`clientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fusion_interno`.`clientes` (
  `id_clientes` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NULL,
  `aoellido` VARCHAR(255) NULL,
  `telefono` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `direccion` VARCHAR(255) NULL,
  `tipo_cliente` VARCHAR(255) NULL,
  PRIMARY KEY (`id_clientes`)
)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fusion_interno`.`pedidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fusion_interno`.`pedidos` (
  `id_pedidos` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NULL,
  `fecha_entrada` DATE NULL,
  `fecha_entrega` DATE NULL,
  `direccion_entrega` VARCHAR(255) NULL,
  `notas` VARCHAR(255) NULL,
  PRIMARY KEY (`id_pedidos`),
  CONSTRAINT `id_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `fusion_interno`.`clientes` (`id_clientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fusion_interno`.`muebles_prod`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fusion_interno`.`muebles_prod` (
  `id_muebles_prod` INT NOT NULL AUTO_INCREMENT,
  `linea` VARCHAR(255) NULL,
  `modelo` VARCHAR(255) NULL,
  `largo` INT NULL,
  `alto_total` INT NULL,
  `profundidad` INT NULL,
  `terminacion` VARCHAR(255) NULL,
  `color` VARCHAR(255) NULL,
  `terminacion_frentes` VARCHAR(255) NULL,
  `n_puertas` INT NULL,
  `n_cajones` INT NULL,
  `n_cajones_internos` INT NULL,
  `patas_altura` INT NULL,
  `patas_modelo` VARCHAR(255) NULL,
  `patas_color` VARCHAR(255) NULL,
  `estado` VARCHAR(255) NULL,
  `notas` VARCHAR(255) NULL,
  `cantidad` INT NULL,
  `id_pedido` INT NULL,
  PRIMARY KEY (`id_muebles_prod`),
  CONSTRAINT `id_pedio`
    FOREIGN KEY (`id_pedido`)
    REFERENCES `fusion_interno`.`pedidos` (`id_pedidos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fusion_interno`.`herrajes_x_mueble`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fusion_interno`.`herrajes_x_mueble` (
  `id_herrajes_x_mueble` INT NOT NULL AUTO_INCREMENT,
  `id_mueble` INT NULL,
  `id_herraje` INT NULL,
  `cantidad` INT NULL,
  `asignado` VARCHAR(255) NULL,
  PRIMARY KEY (`id_herrajes_x_mueble`),
  CONSTRAINT `id_mueble`
    FOREIGN KEY (`id_mueble`)
    REFERENCES `fusion_interno`.`muebles_prod` (`id_muebles_prod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_herraje`
    FOREIGN KEY (`id_herraje`)
    REFERENCES `fusion_interno`.`Herrajes` (`id_herrajes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
