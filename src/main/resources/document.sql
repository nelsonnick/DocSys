CREATE TABLE `Person` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255) CHARACTER SET utf8 NULL,
`number` varchar(255) CHARACTER SET utf8 NULL,
`phone1` varchar(255) CHARACTER SET utf8 NULL,
`phone2` varchar(255) CHARACTER SET utf8 NULL,
`address` varchar(255) CHARACTER SET utf8 NULL,
`sex` int NULL,
`birth` datetime NULL,
`remark` varchar(255) NULL,
`fileAge` datetime NULL,
`retire` varchar(255) CHARACTER SET utf8 NULL,
`info` varchar(255) CHARACTER SET utf8 NULL,
`state` varchar(255) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `File` (
`id` int NOT NULL AUTO_INCREMENT,
`pid` int NULL,
`did` int NULL,
`number` varchar(255) CHARACTER SET utf8 NULL,
`state` varchar(255) NULL,
`remark` varchar(255) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Department` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255) CHARACTER SET utf8 NULL,
`number` varchar(255) CHARACTER SET utf8 NULL,
`phone` varchar(255) CHARACTER SET utf8 NULL,
`address` varchar(255) CHARACTER SET utf8 NULL,
`state` varchar(255) NULL,
`other` varchar(255) CHARACTER SET utf8 NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `User` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255) CHARACTER SET utf8 NULL,
`number` varchar(255) CHARACTER SET utf8 NULL,
`phone` varchar(255) CHARACTER SET utf8 NULL,
`login` varchar(255) CHARACTER SET utf8 NULL,
`pass` varchar(255) CHARACTER SET utf8 NULL,
`did` int NULL,
`other` varchar(255) CHARACTER SET utf8 NULL,
`state` varchar(255) NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Flow` (
`id` int NOT NULL AUTO_INCREMENT,
`uid` int NULL,
`did` int NULL,
`time` datetime NULL,
`remark` varchar(255) NULL,
`direct` varchar(255) CHARACTER SET utf8 NULL,
`reason` varchar(255) CHARACTER SET utf8 NULL,
`flow` varchar(255) CHARACTER SET utf8 NULL,
`type` varchar(255) CHARACTER SET utf8 NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Trans` (
`id` int NOT NULL AUTO_INCREMENT,
`pid` int NULL,
`did` int NULL,
`uid` int NULL,
`time` datetime NULL,
`nameBefore` varchar(255) CHARACTER SET utf8 NULL,
`nameAfter` varchar(255) CHARACTER SET utf8 NULL,
`numberBefore` varchar(255) CHARACTER SET utf8 NULL,
`numberAfter` varchar(255) CHARACTER SET utf8 NULL,
`phone1Before` varchar(255) CHARACTER SET utf8 NULL,
`phone1After` varchar(255) CHARACTER SET utf8 NULL,
`phone2Before` varchar(255) CHARACTER SET utf8 NULL,
`phone2After` varchar(255) CHARACTER SET utf8 NULL,
`addressBefore` varchar(255) CHARACTER SET utf8 NULL,
`addressAfter` varchar(255) CHARACTER SET utf8 NULL,
`fileAgeBefore` datetime NULL,
`fileAgeAfter` datetime NULL,
PRIMARY KEY (`id`) 
);


ALTER TABLE `User` ADD CONSTRAINT `user_department` FOREIGN KEY (`did`) REFERENCES `Department` (`id`);
ALTER TABLE `File` ADD CONSTRAINT `file_person` FOREIGN KEY (`pid`) REFERENCES `Person` (`id`);
ALTER TABLE `File` ADD CONSTRAINT `file_department` FOREIGN KEY (`did`) REFERENCES `Department` (`id`);
ALTER TABLE `Flow` ADD CONSTRAINT `flow_user` FOREIGN KEY (`uid`) REFERENCES `User` (`id`);
ALTER TABLE `Flow` ADD CONSTRAINT `flow_department` FOREIGN KEY (`did`) REFERENCES `Department` (`id`);
ALTER TABLE `Trans` ADD CONSTRAINT `trans_person` FOREIGN KEY (`pid`) REFERENCES `Person` (`id`);
ALTER TABLE `Trans` ADD CONSTRAINT `trans_user` FOREIGN KEY (`uid`) REFERENCES `User` (`id`);
ALTER TABLE `Trans` ADD CONSTRAINT `trans_department` FOREIGN KEY (`did`) REFERENCES `Department` (`id`);

