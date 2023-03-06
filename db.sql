-- -----------------------------------------------------
-- Schema plantapp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `plantapp` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `plantapp` ;

-- -----------------------------------------------------
-- Table `plantapp`.`achievement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`achievement` (
  `achievement_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(200) NULL,
  PRIMARY KEY (`achievement_id`))
;


-- -----------------------------------------------------
-- Table `plantapp`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `icon` VARCHAR(50) NOT NULL,
  `xp` INT UNSIGNED NOT NULL DEFAULT 0,
  `lvl` INT UNSIGNED NOT NULL DEFAULT 0,
  `currency` INT UNSIGNED NOT NULL DEFAULT 0,
  `plant_slots` TINYINT UNSIGNED NOT NULL DEFAULT 10,
  `site_slots` TINYINT UNSIGNED NOT NULL DEFAULT 2,
  `email_notifications` TINYINT NOT NULL DEFAULT 1,
  `interface_theme` CHAR(1) NOT NULL DEFAULT 'L',
  PRIMARY KEY (`user_id`))
;


-- -----------------------------------------------------
-- Table `plantapp`.`flowerpot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`flowerpot` (
  `flowerpot_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`flowerpot_id`))
;

CREATE UNIQUE INDEX `name_UNIQUE` ON `plantapp`.`flowerpot` (`name` ASC) ;


-- -----------------------------------------------------
-- Table `plantapp`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`admin` (
  `login` VARCHAR(50) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `mod_level` TINYINT NOT NULL,
  PRIMARY KEY (`login`))
;


-- -----------------------------------------------------
-- Table `plantapp`.`site`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`site` (
  `site_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NULL,
  `icon` VARCHAR(50) NOT NULL,
  `is_indoor` TINYINT NOT NULL,
  `humidity_level` TINYINT NULL,
  `light_level` TINYINT NULL,
  PRIMARY KEY (`site_id`),
  CONSTRAINT `fk_site_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `plantapp`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;

CREATE INDEX `fk_site_user1_idx` ON `plantapp`.`site` (`user_id` ASC) ;


-- -----------------------------------------------------
-- Table `plantapp`.`plant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`plant` (
  `plant_id` INT NOT NULL AUTO_INCREMENT,
  `primary_name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NULL,
  `icon` VARCHAR(50) NOT NULL,
  `prefered_humidity` TINYINT NULL,
  `prefered_light_level` TINYINT NULL,
  `fertilizing_frequency_summer` SMALLINT NOT NULL,
  `fertilizing_frequency_winter` SMALLINT NOT NULL,
  `watering_frequency_summer` SMALLINT NOT NULL,
  `watering_frequency_winter` SMALLINT NOT NULL,
  `outdoor_summer` TINYINT NULL,
  `outdoor_winter` TINYINT NULL,
  `min_temp_winter` TINYINT NULL,
  `max_temp_winter` TINYINT NULL,
  `min_temp_summer` TINYINT NULL,
  `max_temp_summer` TINYINT NULL,
  `likes_misting` TINYINT NULL,
  `is_toxic` TINYINT NULL,
  PRIMARY KEY (`plant_id`))
;


-- -----------------------------------------------------
-- Table `plantapp`.`plant_name`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`plant_name` (
  `plant_name_id` INT NOT NULL AUTO_INCREMENT,
  `plant_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`plant_name_id`),
  CONSTRAINT `fk_plant_name_plant1`
    FOREIGN KEY (`plant_id`)
    REFERENCES `plantapp`.`plant` (`plant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;

CREATE INDEX `fk_plant_name_plant1_idx` ON `plantapp`.`plant_name` (`plant_id` ASC) ;


-- -----------------------------------------------------
-- Table `plantapp`.`user_has_achievement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`user_has_achievement` (
  `user_id` INT NOT NULL,
  `achievement_id` INT NOT NULL,
  `unlocked_on` DATE NOT NULL,
  PRIMARY KEY (`user_id`, `achievement_id`),
  CONSTRAINT `fk_user_has_achievement1_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `plantapp`.`user` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_achievement1_achievement1`
    FOREIGN KEY (`achievement_id`)
    REFERENCES `plantapp`.`achievement` (`achievement_id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE)
;

CREATE INDEX `fk_user_has_achievement1_achievement1_idx` ON `plantapp`.`user_has_achievement` (`achievement_id` ASC) ;

CREATE INDEX `fk_user_has_achievement1_user_idx` ON `plantapp`.`user_has_achievement` (`user_id` ASC) ;


-- -----------------------------------------------------
-- Table `plantapp`.`user_has_flowerpot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`user_has_flowerpot` (
  `user_user_id` INT NOT NULL,
  `flowerpot_flowerpot_id` INT NOT NULL,
  PRIMARY KEY (`user_user_id`, `flowerpot_flowerpot_id`),
  CONSTRAINT `fk_user_has_flowerpot_user1`
    FOREIGN KEY (`user_user_id`)
    REFERENCES `plantapp`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_flowerpot_flowerpot1`
    FOREIGN KEY (`flowerpot_flowerpot_id`)
    REFERENCES `plantapp`.`flowerpot` (`flowerpot_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;

CREATE INDEX `fk_user_has_flowerpot_flowerpot1_idx` ON `plantapp`.`user_has_flowerpot` (`flowerpot_flowerpot_id` ASC) ;

CREATE INDEX `fk_user_has_flowerpot_user1_idx` ON `plantapp`.`user_has_flowerpot` (`user_user_id` ASC) ;


-- -----------------------------------------------------
-- Table `plantapp`.`site_has_plant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`site_has_plant` (
  `site_has_plant_id` INT NOT NULL AUTO_INCREMENT,
  `site_id` INT NOT NULL,
  `plant_id` INT NOT NULL,
  `flowerpot_id` INT NULL,
  `date_added` DATE NOT NULL,
  `last_watered` DATE NOT NULL,
  `last_fertilized` DATE NOT NULL,
  `watering_counter` INT UNSIGNED NOT NULL DEFAULT 0,
  `fertilizing_counter` INT UNSIGNED NOT NULL DEFAULT 0,
  `note` VARCHAR(500) NULL,
  PRIMARY KEY (`site_has_plant_id`),
  CONSTRAINT `fk_site_has_plant_site1`
    FOREIGN KEY (`site_id`)
    REFERENCES `plantapp`.`site` (`site_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_site_has_plant_plant1`
    FOREIGN KEY (`plant_id`)
    REFERENCES `plantapp`.`plant` (`plant_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_site_has_plant_flowerpot1`
    FOREIGN KEY (`flowerpot_id`)
    REFERENCES `plantapp`.`flowerpot` (`flowerpot_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
;

CREATE INDEX `fk_site_has_plant_plant1_idx` ON `plantapp`.`site_has_plant` (`plant_id` ASC) ;

CREATE INDEX `fk_site_has_plant_site1_idx` ON `plantapp`.`site_has_plant` (`site_id` ASC) ;

CREATE INDEX `fk_site_has_plant_flowerpot1_idx` ON `plantapp`.`site_has_plant` (`flowerpot_id` ASC) ;


INSERT INTO `plantapp`.`plant` ( `primary_name`, `description`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ( 'Aloe Vera', 'A succulent plant with fleshy, green leaves that can grow up to 2 feet tall. The gel inside the leaves is commonly used for medicinal purposes and skincare.', '1', '2', '28', '56', '14', '28', '1', '0', '10', '21', '16', '29', '0', '1');

INSERT INTO `plantapp`.`plant` ( `primary_name`, `description`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ( 'Echeveria', 'A succulent plant with rosettes of fleshy, colorful leaves that can range in size from a few inches to over a foot in diameter.', '1', '2', '28', '56', '14', '28', '1', '0', '10', '21', '16', '29', '0', '0');

INSERT INTO `plantapp`.`plant` ( `primary_name`, `description`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Cactus', 'A type of succulent plant with a distinct, prickly appearance and various shapes and sizes.', '1', '3', '28', '84', '14', '28', '1', '0', '10', '21', '16', '32', '0', '0');

INSERT INTO `plantapp`.`plant` ( `primary_name`, `description`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Monstera', 'Monstera is a popular houseplant that is native to the tropical rainforests of Central and South America. It has large, glossy, heart-shaped leaves that are deeply lobed and can grow up to several feet long. Monstera plants are commonly grown for their attractive foliage and easy-to-care-for nature', '3', '2', '14', '28', '7', '14', '1', '0', '12', '29', '16', '32', '1', '1');

INSERT INTO `plantapp`.`plant` ( `primary_name`, `description`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Sweetheart plant', 'The Sweetheart plant, also known as the Hoya kerrii, is a small, slow-growing tropical succulent native to Southeast Asia. It is commonly grown as a houseplant for its heart-shaped leaves that have a glossy, waxy appearance and a distinctive green color.', '2', '2', '28', '56', '7', '21', '1', '0', '16', '27', '16', '29', '1', '0');

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Snake Plant', 'The Snake Plant, also known as Sansevieria or Mother-in-laws tongue, is a hardy, drought-tolerant plant with long, pointed leaves that grow upright. It is a popular houseplant because of its ease of care and ability to purify the air.', '2', '2', '56', '84', '14', '28', '1', '0', '10', '27', '10', '32', '0', '1');


