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
  `claimed_rewards` tinyint(4) unsigned NOT NULL DEFAULT 0,
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


INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Cactus', 'A desert plant known for its distinctive appearance and ability to store water in its stem and leaves.', 'cactus', 1, 3, 30, 60, 14, 30, 1, 0, 5, 18, 25, 40, 0, 0);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Echeveria', 'A succulent plant known for its rosette-shaped leaves and vibrant colors.', 'echeveria', 2, 2, 14, 30, 7, 14, 1, 0, 10, 18, 20, 35, 1, 1);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Pothos', 'A popular trailing plant that is easy to care for and can thrive in low light conditions.', 'hanging_leaves', 1, 1, 14, 30, 7, 14, 1, 0, 15, 24, 18, 30, 0, 1);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Peace Lily', 'A beautiful and low-maintenance plant with dark green leaves and white flowers. It can thrive in low light and low humidity environments.', 'lily', 1, 1, 14, 30, 7, 14, 0, 0, 16, 24, 18, 28, 1, 1);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Monstera', 'A popular tropical plant with large, glossy leaves with natural holes. It thrives in bright, indirect light and high humidity.', 'monstera', 3, 2, 7, 14, 7, 14, 1, 0, 16, 24, 20, 32, 1, 1);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Majesty Palm', 'A tropical plant with long, graceful fronds that can add a touch of elegance to any room. It thrives in bright, indirect light and high humidity.', 'palm', 3, 2, 14, 28, 7, 14, 1, 0, 16, 24, 20, 32, 1, 1);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Chinese Money Plant', 'A popular houseplant with round, coin-shaped leaves. It prefers bright, indirect light and moderate humidity. Easy to care for and propagate!', 'round_leaves', 2, 2, 14, 28, 7, 14, 0, 0, 15, 24, 18, 28, 0, 0);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Rubber Tree', 'A tropical plant with large, shiny, dark green leaves. It prefers bright, indirect light and high humidity. Keep soil moist, but not waterlogged, and fertilize monthly during the growing season.', 'rubber_plant', 3, 2, 14, 28, 7, 14, 1, 0, 16, 24, 20, 28, 1, 1);

INSERT INTO `plantapp`.`plant` (`primary_name`, `description`, `icon`, `prefered_humidity`, `prefered_light_level`, `fertilizing_frequency_summer`, `fertilizing_frequency_winter`, `watering_frequency_summer`, `watering_frequency_winter`, `outdoor_summer`, `outdoor_winter`, `min_temp_winter`, `max_temp_winter`, `min_temp_summer`, `max_temp_summer`, `likes_misting`, `is_toxic`) 
VALUES ('Zamioculcas', 'A tropical plant with glossy green leaves that can tolerate low light and irregular watering. Allow the soil to dry out slightly between waterings and fertilize every 3 months.', 'zamioculcas', 1, 1, 30, 90, 14, 21, 0, 0, 16, 24, 20, 28, 0, 1);


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
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Collector I', 'flowerpot_collector_1', 'Buy your first flowerpot.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Collector II', 'flowerpot_collector_2', 'Buy 5 flowerpots.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Collector III', 'flowerpot_collector_3', 'Buy 10 flowerpots.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Collector IV', 'flowerpot_collector_4', 'Buy 20 flowerpots.');
INSERT INTO `plantapp`.`achievement` (`name`, `icon`, `description`) VALUES ('Collector V', 'flowerpot_collector_5', 'Buy 30 flowerpots.');

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

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_site`(
IN p_user_id INT,
IN p_name VARCHAR(100),
IN p_description VARCHAR(500),
IN p_icon VARCHAR(50),
IN p_is_indoor TINYINT(4),
IN p_humidity_level TINYINT(4),
IN p_light_level TINYINT(4)
)
BEGIN
DECLARE v_site_count INT;

-- Check if user has exceeded maximum site slots
SELECT COUNT(*) INTO v_site_count FROM site WHERE user_id = p_user_id;

IF v_site_count >= (SELECT site_slots FROM user WHERE user_id = p_user_id) THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Maximum number of sites was exceeded.';
ELSE
-- Insert new site
INSERT INTO site(user_id, name, description, icon, is_indoor, humidity_level, light_level)
VALUES (p_user_id, p_name, p_description, p_icon, p_is_indoor, p_humidity_level, p_light_level);
END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_plant`(
  IN p_site_id INT,
  IN p_plant_id INT,
  IN p_date_added DATE,
  IN p_last_watered DATE,
  IN p_last_fertilized DATE,
  IN p_note VARCHAR(500)
)
BEGIN
  DECLARE v_user_id INT;
  DECLARE v_plant_count INT; 
  DECLARE v_max_plants INT;
 
  -- Get user id from the site
  SELECT user_id INTO v_user_id FROM site WHERE site_id = p_site_id;
  
  -- Get the number of plants added by the user
  SELECT COUNT(*) INTO v_plant_count FROM site_has_plant sp 
  JOIN site s ON s.site_id = sp.site_id 
  WHERE s.user_id = v_user_id;
  
  -- Get the maximum number of plants allowed for the user
 SELECT plant_slots INTO v_max_plants FROM user WHERE user_id = v_user_id;
  
  -- Check if the user has reached the maximum number of allowed plants
  IF v_plant_count >= v_max_plants THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Maximum number of plants exceeded.';
  ELSE
    -- Insert the plant into the site_has_plant table
    INSERT INTO site_has_plant (site_id, plant_id, date_added, last_watered, last_fertilized, note) 
    VALUES (p_site_id, p_plant_id, p_date_added, p_last_watered, p_last_fertilized, p_note);
  END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `claim_rewards`(IN p_user_id INT)
BEGIN
  DECLARE user_lvl INT;
  DECLARE user_claimed_rewards INT;
  DECLARE plant_slots_reward INT;
  DECLARE site_slots_reward INT;

  -- Get user's current level
  SELECT lvl INTO user_lvl FROM user WHERE user_id = p_user_id;
  SELECT claimed_rewards INTO user_claimed_rewards FROM user WHERE user_id = p_user_id;
  
  -- Calculate rewards
  SET plant_slots_reward = (FLOOR(user_lvl/5) - user_claimed_rewards) * 5 ;
  SET site_slots_reward = FLOOR(user_lvl/10) - FLOOR(user_claimed_rewards/2);

  
  -- Check if rewards have already been claimed
  IF user_claimed_rewards >= (FLOOR(user_lvl/5)) THEN
    SELECT 'Rewards have already been claimed.' AS message;
  ELSE
    -- Update user's rewards 
    UPDATE user SET plant_slots = plant_slots + plant_slots_reward, site_slots = site_slots + site_slots_reward, claimed_rewards = FLOOR(user_lvl/5) WHERE user_id = p_user_id;
    SELECT CONCAT('Rewards claimed! Plant slots: +', plant_slots_reward, ', Site slots: +', site_slots_reward) AS message;
  END IF;
END$$
DELIMITER ;

