CREATE TABLE `bf_abilities` (
	`ability_id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_id` INT(11) NULL DEFAULT NULL,
	`name` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Chess',
	`description` VARCHAR(50) NULL DEFAULT NULL COMMENT 'enjoy, dont stratagise',
	`rating` INT(11) NULL DEFAULT '3' COMMENT '1-5',
	`active` INT(11) NULL DEFAULT '0' COMMENT 'true or false',
	PRIMARY KEY (`ability_id`),
	INDEX `Index 2` (`user_id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=4
;
