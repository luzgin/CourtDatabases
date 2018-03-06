DROP DATABASE IF EXISTS `court_databases`;
CREATE DATABASE court_databases
  DEFAULT CHARACTER SET utf8;

USE court_databases;

DROP TABLE IF EXISTS `name_entity_decree_adm`;
CREATE TABLE IF NOT EXISTS name_entity_decree_adm (
  id   INT(10) AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `entity_decree_adm`;
CREATE TABLE entity_decree_adm (
  id                    INT(10) AUTO_INCREMENT,
  name_entity_decree_id INT(10) NOT NULL,
  prim                  VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (name_entity_decree_id) REFERENCES name_entity_decree_adm (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `result_adm`;
CREATE TABLE IF NOT EXISTS result_adm (
  id   INT(10) AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `article_adm`;
CREATE TABLE IF NOT EXISTS article_adm (
  id      INT(10) AUTO_INCREMENT,
  article VARCHAR(15)  NOT NULL,
  part    INT(5),
  note    VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `entity_isk_adm`;
CREATE TABLE IF NOT EXISTS entity_isk_adm (
  id   INT(10) AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `date_request_case`;
CREATE TABLE IF NOT EXISTS date_request_case (
  id           INT(10) AUTO_INCREMENT,
  organization VARCHAR(200) NOT NULL,
  date         DATE         NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `date_return_case`;
CREATE TABLE IF NOT EXISTS date_return_case (
  id           INT(10) AUTO_INCREMENT,
  organization VARCHAR(200) NOT NULL,
  date         DATE         NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `organization`;
CREATE TABLE IF NOT EXISTS organization (
  id   INT(10) AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  type INT(2)       NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `author_document`;
CREATE TABLE IF NOT EXISTS author_document (
  id              INT(10) AUTO_INCREMENT,
  name            VARCHAR(100) NOT NULL,
  position        VARCHAR(200) NOT NULL,
  activ_work      BOOLEAN      NOT NULL,
  organization_id INT(2)       NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (organization_id) REFERENCES organization (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `second_instance_adm`;
CREATE TABLE IF NOT EXISTS second_instance_adm (
  id                 INT(10) AUTO_INCREMENT,
  organization_id    INT(10) NOT NULL,
  author_document_id INT(10) NOT NULL,
  decree_date        DATE    NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (organization_id) REFERENCES organization (id),
  FOREIGN KEY (author_document_id) REFERENCES author_document (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;


DROP TABLE IF EXISTS `decree_adm`;
CREATE TABLE IF NOT EXISTS decree_adm (
  id                 INT(10) AUTO_INCREMENT,
  author_document_id INT(10) NOT NULL,
  organization_id    INT(10) NOT NULL,
  decree_date        DATE    NOT NULL,
  entered_into_force BOOLEAN NOT NULL,
  second_instance_id INT(10),
  PRIMARY KEY (id),
  FOREIGN KEY (organization_id) REFERENCES organization (id),
  FOREIGN KEY (second_instance_id) REFERENCES second_instance_adm (id),
  FOREIGN KEY (author_document_id) REFERENCES author_document (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `vialator`;
CREATE TABLE IF NOT EXISTS vialator (
  id             INT(10) AUTO_INCREMENT,
  type_vialator  INT(2)       NOT NULL,
  firstname      VARCHAR(250) NOT NULL,
  secondname     VARCHAR(50),
  lastname       VARCHAR(50),
  private_number VARCHAR(50),
  PRIMARY KEY (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `card_adm`;
CREATE TABLE IF NOT EXISTS card_adm (
  id                   INT(10) AUTO_INCREMENT,
  card_number          INT(10)      NOT NULL,
  card_create_date     DATE         NOT NULL,
  decree_adm_id        INT(10)      NOT NULL,
  vialator_id          INT(10)      NOT NULL,
  article_id           INT(10)      NOT NULL,
  entity_decree_id     INT(10)      NOT NULL,
  note_article         VARCHAR(200),
  judge_id             INT(10),
  card_activ           BOOLEAN      NOT NULL,
  result_date          DATE,
  result_id            INT(2),
  date_request_delo_id INT(10),
  date_return_delo_id  INT(10),
  note                 VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (vialator_id) REFERENCES vialator (id),
  FOREIGN KEY (decree_adm_id) REFERENCES decree_adm (id),
  FOREIGN KEY (date_request_delo_id) REFERENCES date_request_case (id),
  FOREIGN KEY (date_return_delo_id) REFERENCES date_return_case (id),
  FOREIGN KEY (article_id) REFERENCES article_adm (id),
  FOREIGN KEY (entity_decree_id) REFERENCES entity_decree_adm (id),
  FOREIGN KEY (judge_id) REFERENCES author_document (id),
  FOREIGN KEY (result_id) REFERENCES result_adm (id)

)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `complaints_adm`;
CREATE TABLE IF NOT EXISTS complaints_adm (
  id                    INT(10) AUTO_INCREMENT,
  date_complaint        DATE         NOT NULL,
  entity_id             INT(10)      NOT NULL,
  name_author_complaint VARCHAR(200) NOT NULL,
  activ                 BOOLEAN      NOT NULL,
  decree_adm_id         INT(10)      NOT NULL,
  summ_poshlini         DECIMAL(50)  NOT NULL,
  card_adm_id           INT(10),
  PRIMARY KEY (id),
  FOREIGN KEY (entity_id) REFERENCES entity_isk_adm (id),
  FOREIGN KEY (card_adm_id) REFERENCES card_adm (id),
  FOREIGN KEY (decree_adm_id) REFERENCES decree_adm (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('1.1', '1', 'описание 1');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('2.1', '2', 'описание 2');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('3.1', '3', 'описание 3');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('4.1', '4', 'описание 4');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('5.1', '5', 'описание 5');


INSERT INTO `organization` (`name`, `type`) VALUES ('Организация 1', '2');
INSERT INTO `organization` (`name`, `type`) VALUES ('Организация 2', '2');
INSERT INTO `organization` (`name`, `type`) VALUES ('Организация 3', '2');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд 1', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд 2', '1');

INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`)
VALUES ('Петров П.П.', 'Начальник', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`)
VALUES ('Сидоров В.Д.', 'Председатель', '1', '2');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`)
VALUES ('Иванов У.Ю.', 'заместитель председателя', '1', '3');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`)
VALUES ('Пышкина Д.В.', 'дизйнер ландшафта', '1', '4');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`)
VALUES ('Печкин А.П.', 'Самый главный', '1', '1');

INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Название сущности постановления 1');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Название сущности постановления 2');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Название сущности постановления 3');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Название сущности постановления 4');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Название сущности постановления 5');

INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('1', 'Примечание по постановлению 1');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('2', 'Примечание по постановлению 2');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('3', 'Примечание по постановлению 3');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('4', 'Примечание по постановлению 4');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('5', 'Примечание по постановлению 5');

INSERT INTO `entity_isk_adm` (`name`) VALUES ('Сущность жалобы 1');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('Сущность жалобы 2');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('Сущность жалобы 3');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('Сущность жалобы 4');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('Сущность жалобы 5');

INSERT INTO `result_adm` (`name`) VALUES ('Результат решения 1');
INSERT INTO `result_adm` (`name`) VALUES ('Результат решения 2');
INSERT INTO `result_adm` (`name`) VALUES ('Результат решения 3');
INSERT INTO `result_adm` (`name`) VALUES ('Результат решения 4');
INSERT INTO `result_adm` (`name`) VALUES ('Результат решения 5');

INSERT INTO `vialator` (`type_vialator`, `firstname`, `secondname`, `lastname`, `private_number`)
VALUES ('1', 'Архипов', 'Никита', 'Сергеевич', '3101290E001PB3');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `secondname`, `lastname`, `private_number`)
VALUES ('1', 'Семенова', 'Екатерина', 'Эдуардовна', '3101080E001PB4');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `secondname`, `lastname`, `private_number`)
VALUES ('1', 'Сапелка', 'Антон', 'Федорович', 'number 3');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `secondname`, `lastname`, `private_number`)
VALUES ('1', 'Закревский', 'Дмитрий', 'Сергеевич', 'number 4');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `secondname`, `lastname`, `private_number`)
VALUES ('1', 'Микульская', 'Виктория', 'Александровна', 'number 5');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `private_number`) VALUES ('2', 'РАЙПО', 'number ur 1');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `private_number`) VALUES ('2', 'Магазин СОЛНЫШКО', 'number ur 2');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `private_number`) VALUES ('2', 'ОАО Марко', 'number ur 3');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `private_number`) VALUES ('2', 'ОДО ВИСЕМ', 'number ur 4');
INSERT INTO `vialator` (`type_vialator`, `firstname`, `private_number`) VALUES ('2', 'ИП Иванов АА', 'number ur 5');


INSERT INTO `second_instance_adm` (`organization_id`, `author_document_id`, `decree_date`) VALUES (2, 2, '2017-01-02');
INSERT INTO `second_instance_adm` (`organization_id`, `author_document_id`, `decree_date`) VALUES (4, 2, '2012-12-12');

INSERT INTO `decree_adm` (`author_document_id`, `organization_id`, `decree_date`, `entered_into_force`, `second_instance_id`)
VALUES (3, 1, '2016-02-25', 1, NULL);
INSERT INTO `decree_adm` (`author_document_id`, `organization_id`, `decree_date`, `entered_into_force`, `second_instance_id`)
VALUES (2, 5, '2015-12-20', 1, 1);

INSERT INTO `complaints_adm` (`date_complaint`, `entity_id`, `name_author_complaint`, `activ`, `decree_adm_id`, `summ_poshlini`, `card_adm_id`)
VALUES ('2018-03-05', 2, 'Пупкин В.В.', 0, 1, '10', NULL);

