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
  `icon` VARCHAR(50) NOT NULL,
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
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_achievement1_achievement1`
    FOREIGN KEY (`achievement_id`)
    REFERENCES `plantapp`.`achievement` (`achievement_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
;

CREATE INDEX `fk_user_has_achievement1_achievement1_idx` ON `plantapp`.`user_has_achievement` (`achievement_id` ASC) ;

CREATE INDEX `fk_user_has_achievement1_user_idx` ON `plantapp`.`user_has_achievement` (`user_id` ASC) ;


-- -----------------------------------------------------
-- Table `plantapp`.`user_has_flowerpot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `plantapp`.`user_has_flowerpot` (
  `user_id` INT NOT NULL,
  `flowerpot_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `flowerpot_id`),
  CONSTRAINT `fk_user_has_flowerpot_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `plantapp`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_flowerpot_flowerpot1`
    FOREIGN KEY (`flowerpot_id`)
    REFERENCES `plantapp`.`flowerpot` (`flowerpot_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
;

CREATE INDEX `fk_user_has_flowerpot_flowerpot1_idx` ON `plantapp`.`user_has_flowerpot` (`flowerpot_id` ASC) ;

CREATE INDEX `fk_user_has_flowerpot_user1_idx` ON `plantapp`.`user_has_flowerpot` (`user_id` ASC) ;


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


INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ( 'Aloe Vera', 'A succulent plant with fleshy, green leaves that can grow up to 2 feet tall. The gel inside the leaves is commonly used for medicinal purposes and skincare.', 'aloevera', '1', '2', '28', '56', '14', '28', '1', '0', '10', '21', '16', '29', '0', '1');
INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ( 'Echeveria', 'A succulent plant with rosettes of fleshy, colorful leaves that can range in size from a few inches to over a foot in diameter.', 'echeveria', '1', '2', '28', '56', '14', '28', '1', '0', '10', '21', '16', '29', '0', '0');
INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Cactus', 'A type of succulent plant with a distinct, prickly appearance and various shapes and sizes.', 'cactus', '1', '3', '28', '84', '14', '28', '1', '0', '10', '21', '16', '32', '0', '0');
INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Monstera', 'Monstera is a popular houseplant that is native to the tropical rainforests of Central and South America. It has large, glossy, heart-shaped leaves that are deeply lobed and can grow up to several feet long. Monstera plants are commonly grown for their attractive foliage and easy-to-care-for nature', 'monstera', '3', '2', '14', '28', '7', '14', '1', '0', '12', '29', '16', '32', '1', '1');
INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Sweetheart plant', 'The Sweetheart plant, also known as the Hoya kerrii, is a small, slow-growing tropical succulent native to Southeast Asia. It is commonly grown as a houseplant for its heart-shaped leaves that have a glossy, waxy appearance and a distinctive green color.', 'sweetheart_plant', '2', '2', '28', '56', '7', '21', '1', '0', '16', '27', '16', '29', '1', '0');
INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) VALUES ('Snake Plant', 'The Snake Plant, also known as Sansevieria or Mother-in-laws tongue, is a hardy, drought-tolerant plant with long, pointed leaves that grow upright. It is a popular houseplant because of its ease of care and ability to purify the air.', 'snake_plant', '2', '2', '56', '84', '14', '28', '1', '0', '10', '27', '10', '32', '0', '1');


INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Waterbender I', 'waterbender_1', 'Water your first plant.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Waterbender II', 'waterbender_2', 'Water plants 10 times.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Waterbender III', 'waterbender_3', 'Water plants 50 times.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Waterbender IV', 'waterbender_4', 'Water plants 100 times.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Waterbender V', 'waterbender_5', 'Water plants 500 times.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Earthbender I', 'earthbender_1', 'Fertilize your first plant.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Earthbender II', 'earthbender_2', 'Fertilize plants 5 times.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Earthbender III', 'earthbender_3', 'Fertilize plant 25 times.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Earthbender IV', 'earthbender_4', 'Fertilize plant 50 times.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Earthbender V', 'earthbender_5', 'Fertilize plant 100 times.');

INSERT INTO `plantapp`.`flowerpot`(`name`, `price`) VALUES ('Round white', 300);
INSERT INTO `plantapp`.`flowerpot`(`name`, `price`) VALUES ('Round black', 300);
INSERT INTO `plantapp`.`flowerpot`(`name`, `price`) VALUES ('Round brown', 300);


DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `water_plant`(IN sId INT)
BEGIN
DECLARE days_since_last_watered INT DEFAULT (SELECT DATEDIFF(CURDATE(), (SELECT last_watered FROM site_has_plant WHERE site_has_plant_id = sId)));
DECLARE season varchar(10) DEFAULT (SELECT CASE WHEN MONTH(CURDATE()) IN (10,11,12,1,2,3) THEN 'Winter'
       ELSE 'Summer' END) ;
DECLARE frequency INT DEFAULT (SELECT IF( STRCMP(season,'Winter') = 0, (SELECT watering_frequency_winter FROM site_has_plant s JOIN plant p ON s.plant_id = p.plant_id WHERE site_has_plant_id = sID), (SELECT watering_frequency_summer FROM site_has_plant s JOIN plant p ON s.plant_id = p.plant_id WHERE site_has_plant_id = sID)));
DECLARE points INT DEFAULT (SELECT IF (days_since_last_watered > frequency, frequency, days_since_last_watered));
DECLARE increment INT DEFAULT (SELECT IF( days_since_last_watered > 0, 1, 0));
UPDATE plantapp.site_has_plant 
SET 
    last_watered = CURDATE(),
    watering_counter = watering_counter + increment
WHERE
    site_has_plant_id = sId;
UPDATE user 
SET 
    xp = xp + (points * 10),
    currency = currency + (points * 10)
WHERE
    user_id = (SELECT 
            user_id
        FROM
            plantapp.site_has_plant p
                JOIN
            plantapp.site s ON s.site_id = p.site_id
        WHERE
            site_has_plant_id = sId);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `fertilize_plant`(IN sId INT)
BEGIN
DECLARE days_since_last_fertilized INT DEFAULT (SELECT DATEDIFF(CURDATE(), (SELECT last_fertilized FROM site_has_plant WHERE site_has_plant_id = sId)));
DECLARE season varchar(10) DEFAULT (SELECT CASE WHEN MONTH(CURDATE()) IN (10,11,12,1,2,3) THEN 'Winter'
       ELSE 'Summer' END) ;
DECLARE frequency INT DEFAULT (SELECT IF( STRCMP(season,'Winter') = 0, (SELECT fertilizing_frequency_winter FROM site_has_plant s JOIN plant p ON s.plant_id = p.plant_id WHERE site_has_plant_id = sID), (SELECT fertilizing_frequency_summer FROM site_has_plant s JOIN plant p ON s.plant_id = p.plant_id WHERE site_has_plant_id = sID)));
DECLARE points INT DEFAULT (SELECT IF (days_since_last_fertilized > frequency, frequency, days_since_last_fertilized));
DECLARE increment INT DEFAULT (SELECT IF( days_since_last_fertilized > 0, 1, 0));
UPDATE plantapp.site_has_plant 
SET 
    last_fertilized = CURDATE(),
    fertilizing_counter = fertilizing_counter + increment
WHERE
    site_has_plant_id = sId;
UPDATE user 
SET 
    xp = xp + (points * 10),
    currency = currency + (points * 10)
WHERE
    user_id = (SELECT 
            user_id
        FROM
            plantapp.site_has_plant p
                JOIN
            plantapp.site s ON s.site_id = p.site_id
        WHERE
            site_has_plant_id = sId);
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_achievements`(userID INT)
BEGIN
SELECT a.achievement_id AS achievement_id, a.name, a.description, a.icon, uha.unlocked_on
FROM achievement a
LEFT JOIN user_has_achievement uha ON a.achievement_id = uha.achievement_id AND uha.user_id = userID
ORDER BY uha.unlocked_on DESC, a.name;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_flowerpots`(userID INT)
BEGIN
SELECT f.flowerpot_id, f.name FROM user u JOIN user_has_flowerpot uhf ON u.user_id=uhf.user_id JOIN flowerpot f ON f.flowerpot_id=uhf.flowerpot_id WHERE uhf.user_id = userID;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `set_flowerpot`(plantID INT, flowerpotID INT)
BEGIN
UPDATE site_has_plant SET flowerpot_id = flowerpotID WHERE site_has_plant_id = plantID;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_all_flowerpots`(userID INT)
BEGIN
 SELECT f.flowerpot_id, f.name, f.price, 
    IF(uhf.user_id IS NULL, 0, 1) AS is_purchased
  FROM flowerpot f
  LEFT JOIN user_has_flowerpot uhf ON f.flowerpot_id = uhf.flowerpot_id 
    AND uhf.user_id = userID
  ORDER BY f.price;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `buy_flowerpot`(IN userID INT, IN flowerpotID INT)
BEGIN
  DECLARE v_price INT;
  DECLARE v_currency INT;
  
  SELECT price INTO v_price FROM flowerpot WHERE flowerpot_id = flowerpotID;
  SELECT currency INTO v_currency FROM user WHERE user_id = userID;
  
  IF v_currency >= v_price THEN
    UPDATE user SET currency = v_currency - v_price WHERE user_id = userID;
    INSERT INTO user_has_flowerpot (user_id, flowerpot_id) VALUES (userID, flowerpotID);
    SELECT 'SUCCESS' AS result;
  ELSE
    SELECT 'NOT_ENOUGH_CURRENCY' AS result;
  END IF;
END$$
DELIMITER ;
