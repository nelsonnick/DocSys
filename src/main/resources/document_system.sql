CREATE TABLE `Person` (
`id` int NOT NULL AUTO_INCREMENT,
`name` varchar(255) CHARACTER SET utf8 NULL,
`number` varchar(255) CHARACTER SET utf8 NULL,
`phone1` varchar(255) CHARACTER SET utf8 NULL,
`phone2` varchar(255) CHARACTER SET utf8 NULL,
`address` varchar(255) CHARACTER SET utf8 NULL,
`sex` varchar(255) CHARACTER SET utf8 NULL,
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
`code` varchar(255) CHARACTER SET utf8 NULL,
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
`fid` int NULL,
`pid` int NULL,
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
`fid` int NULL,
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
`infoBefore` varchar(255) CHARACTER SET utf8 NULL,
`infoeAfter` varchar(255) CHARACTER SET utf8 NULL,
`premarkBefore` varchar(255) CHARACTER SET utf8 NULL,
`premarkAfter` varchar(255) CHARACTER SET utf8 NULL,
`retireBefore` varchar(255) CHARACTER SET utf8 NULL,
`retireAfter` varchar(255) CHARACTER SET utf8 NULL,
`fremarkBefore` varchar(255) CHARACTER SET utf8 NULL,
`fremarkAfter` varchar(255) CHARACTER SET utf8 NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Change` (
`id` int NOT NULL AUTO_INCREMENT,
`uid` int NULL,
`fid` int NULL,
`did` int NULL,
`lid` int NULL,
`time` date NULL,
`reasonBefore` varchar(255) CHARACTER SET utf8 NULL,
`reasonAfter` varchar(255) CHARACTER SET utf8 NULL,
`directBefore` varchar(255) CHARACTER SET utf8 NULL,
`directAfter` varchar(255) CHARACTER SET utf8 NULL,
`remarkBefore` varchar(255) CHARACTER SET utf8 NULL,
`remarkAfter` varchar(255) CHARACTER SET utf8 NULL,
`typeBefore` varchar(255) CHARACTER SET utf8 NULL,
`typeAfter` varchar(255) CHARACTER SET utf8 NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Login` (
`id` int NOT NULL AUTO_INCREMENT,
`time` datetime NULL,
`login` varchar(255) CHARACTER SET utf8 NULL,
`pass` varchar(255) CHARACTER SET utf8 NULL,
`state` varchar(255) CHARACTER SET utf8 NULL,
`ip` varchar(255) CHARACTER SET utf8 NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Export` (
`id` int NOT NULL AUTO_INCREMENT,
`uid` int NULL,
`time` datetime NULL,
`type` varchar(255) CHARACTER SET utf8 NULL,
`sql` varchar(999) CHARACTER SET utf8 NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Print` (
`id` int NOT NULL AUTO_INCREMENT,
`uid` int NULL,
`lid` int NULL,
`time` datetime NULL,
PRIMARY KEY (`id`) 
);

CREATE TABLE `Look` (
`id` int NOT NULL AUTO_INCREMENT,
`uid` int NULL,
`time` datetime NULL,
`type` varchar(255) CHARACTER SET utf8 NULL,
`sql` varchar(999) CHARACTER SET utf8 NULL,
`pageNumber` varchar(255) CHARACTER SET utf8 NULL,
`pageSize` varchar(255) CHARACTER SET utf8 NULL,
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
ALTER TABLE `Flow` ADD CONSTRAINT `flow_file` FOREIGN KEY (`fid`) REFERENCES `File` (`id`);
ALTER TABLE `Trans` ADD CONSTRAINT `trans_file` FOREIGN KEY (`fid`) REFERENCES `File` (`id`);
ALTER TABLE `Flow` ADD CONSTRAINT `flow_person` FOREIGN KEY (`pid`) REFERENCES `Person` (`id`);
ALTER TABLE `Change` ADD CONSTRAINT `change_user` FOREIGN KEY (`uid`) REFERENCES `User` (`id`);
ALTER TABLE `Change` ADD CONSTRAINT `change_file` FOREIGN KEY (`fid`) REFERENCES `File` (`id`);
ALTER TABLE `Change` ADD CONSTRAINT `change_departmetn` FOREIGN KEY (`did`) REFERENCES `Department` (`id`);
ALTER TABLE `Change` ADD CONSTRAINT `change_flow` FOREIGN KEY (`lid`) REFERENCES `Flow` (`id`);
ALTER TABLE `Export` ADD CONSTRAINT `export_user` FOREIGN KEY (`uid`) REFERENCES `User` (`id`);
ALTER TABLE `Print` ADD CONSTRAINT `print_user` FOREIGN KEY (`uid`) REFERENCES `User` (`id`);
ALTER TABLE `Print` ADD CONSTRAINT `print_flow` FOREIGN KEY (`lid`) REFERENCES `Flow` (`id`);
ALTER TABLE `Look` ADD CONSTRAINT `look_user` FOREIGN KEY (`uid`) REFERENCES `User` (`id`);
