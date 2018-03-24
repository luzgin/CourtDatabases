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
  id               INT(10) AUTO_INCREMENT,
  card_number      VARCHAR(15) NOT NULL,
  card_create_date DATE    NOT NULL,
  decree_adm_id    INT(10) NOT NULL,
  vialator_id      INT(10) NOT NULL,
  article_id       INT(10) NOT NULL,
  entity_decree_id INT(10) NOT NULL,
  note_article     VARCHAR(200),
  judge_id         INT(10),
  card_activ       BOOLEAN NOT NULL,
  result_date      DATE,
  result_id        INT(2),
  note             VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (vialator_id) REFERENCES vialator (id),
  FOREIGN KEY (decree_adm_id) REFERENCES decree_adm (id),
  FOREIGN KEY (article_id) REFERENCES article_adm (id),
  FOREIGN KEY (entity_decree_id) REFERENCES entity_decree_adm (id),
  FOREIGN KEY (judge_id) REFERENCES author_document (id),
  FOREIGN KEY (result_id) REFERENCES result_adm (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `date_request_case`;
CREATE TABLE IF NOT EXISTS date_request_case (
  id           INT(10) AUTO_INCREMENT,
  organization VARCHAR(200) NOT NULL,
  date         DATE         NOT NULL,
  card_id      INT(10)      NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (card_id) REFERENCES card_adm (id)
)
  ENGINE = INNODB
  DEFAULT CHARACTER SET utf8;

DROP TABLE IF EXISTS `date_return_case`;
CREATE TABLE IF NOT EXISTS date_return_case (
  id           INT(10) AUTO_INCREMENT,
  organization VARCHAR(200) NOT NULL,
  date         DATE         NOT NULL,
  card_id      INT(10)      NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (card_id) REFERENCES card_adm (id)
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
  reinstatement_of_term BOOLEAN      NOT NULL,
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

INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.1', '1', 'Умышленное причинение телесного повреждения и иные насильственные действия либо нарушение защитного предписания');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.1', '2', 'Умышленное причинение телесного повреждения и иные насильственные действия либо нарушение защитного предписания');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.2', '0', 'Клевета');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.3', '0', 'Оскорбление');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.4', '1', 'Невыполнение обязанностей по воспитанию детей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.4', '2', 'Невыполнение обязанностей по воспитанию детей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.5', '0', 'Незаконные действия по усыновлению (удочерению) детей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.6', '0', 'Отказ в предоставлении гражданину информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.7', '0', 'Воспрепятствование проведению собрания, митинга, демонстрации, шествия, пикетирования или участию в них');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.8', '0', 'Нарушение права на свободу объединения граждан в политические партии и иные общественные объединения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.9', '1', 'Нарушение законодательства о свободе вероисповеданий и религиозных организациях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.9', '2', 'Нарушение законодательства о свободе вероисповеданий и религиозных организациях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.9', '3', 'Нарушение законодательства о свободе вероисповеданий и религиозных организациях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.9', '4', 'Нарушение законодательства о свободе вероисповеданий и религиозных организациях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.9', '5', 'Нарушение законодательства о свободе вероисповеданий и религиозных организациях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.10', '0', 'Нарушение законодательства о выборах, референдуме, об отзыве депутата и о реализации права законодательной инициативы граждан');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.11', '0', 'Умышленные уничтожение или повреждение печатных материалов, относящихся к выборам, референдуму');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.12', '0', 'Нарушение установленного законом порядка подсчета голосов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.13', '0', 'Нарушение законодательства об обращениях граждан и юридических лиц');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.14', '0', 'Нарушение законодательства о пенсионном обеспечении');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.15', '1', 'Нарушение законодательства о занятости населения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.15', '2', 'Нарушение законодательства о занятости населения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.15', '3', 'Нарушение законодательства о занятости населения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.16', '1', 'Отказ в приеме на работу');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.16', '2', 'Отказ в приеме на работу');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.17', '1', 'Нарушение требований по охране труда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.17', '2', 'Нарушение требований по охране труда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.17', '3', 'Нарушение требований по охране труда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.18', '1', 'Нарушение законодательства в сфере коллективных трудовых отношений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.18', '2', 'Нарушение законодательства в сфере коллективных трудовых отношений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.18', '3', 'Нарушение законодательства в сфере коллективных трудовых отношений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.19', '1', 'Нарушение законодательства о труде');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.19', '2', 'Исключена. Закон Республики Беларусь от 28.09.2009 № 98-З.');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.19', '3', 'Нарушение законодательства о труде');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.19', '4', 'Нарушение законодательства о труде');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.20', '0', 'Нарушение правил расследования и учета несчастных случаев на производстве и профессиональных заболеваний');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.21', '0', 'Нарушение авторских, смежных и патентных прав');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.21', '1', 'Нарушение авторского права, смежных прав и права промышленной собственности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.21', '2', 'Нарушение авторского права, смежных прав и права промышленной собственности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.21', '3', 'Нарушение авторского права, смежных прав и права промышленной собственности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.22', '0', 'Нарушение законодательства о языках');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.23', '1', 'Нарушение порядка и условий трудоустройства за пределами Респуюлики Беларусь граждан Республики Беларусь, иностранных граждан, лиц без гражданства, постоянно проживающих в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.23', '2', 'Нарушение порядка и условий трудоустройства за пределами Республики Беларусь граждан Республики Беларусь, иностранных граждан, лиц без гражданства, постоянно проживающих в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.24', '0', 'Нарушение законодательства о книге замечаний и предложений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.25', '0', 'Нарушение требований заключения гражданско-правовых договоров');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.26', '0', 'Нарушение законодательства об административных процедурах');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.27', '0', 'Уклонение родителей от трудоустройста по судебному постановлению либо работы');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.28', '1', 'Незаконное проведение опроса общественного мнения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('9.28', '2', 'Незаконное проведение опроса общественного мнения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.1', '0', 'Нарушение права государственной собственности на недра');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.2', '0', 'Нарушение права государственной собственности на воды');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.3', '0', 'Нарушение права государственной собственности на леса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.4', '0', 'Нарушение права государственной собственности на животный мир');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.5', '1', 'Мелкое хищение');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.5', '2', 'Мелкое хищение');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.6', '0', 'Присвоение найденного имущества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.7', '0', 'Причинение имущественного ущерба');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.8', '1', 'Уничтожение или повреждение посевов, собранного урожая сельскохозяйственных культур или насаждений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.8', '2', 'Уничтожение или повреждение посевов, собранного урожая сельскохозяйственных культур или насаждений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.8', '3', 'Уничтожение или повреждение посевов, собранного урожая сельскохозяйственных культур или насаждений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('10.9', '0', 'Умышленные уничтожение либо повреждение имущества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.1', '1', 'Незаконное принятие иностранной валюты в качестве платежного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.1', '2', 'Незаконное принятие иностранной валюты в качестве платежного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.2', '1', 'Нарушение установленного порядка осуществления валютных операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.2', '2', 'Нарушение установленного порядка осуществления валютных операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.2', '3', 'Нарушение установленного порядка осуществления валютных операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.3', '0', 'Нарушение законодательства об обязательной продаже иностранной валюты');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.3', '2', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.4', '1', 'Нарушение порядка деятельности с редкоземельными металлами, драгоценными металлами и драгоценными камнями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.4', '2', 'Нарушение порядка деятельности с редкоземельными металлами, драгоценными металлами и драгоценными камнями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.4', '3', 'Нарушение порядка деятельности с редкоземельными металлами, драгоценными металлами и драгоценными камнями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.5', '1', 'Нарушение порядка открытия счетов за пределами Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.5', '2', 'Нарушение порядка открытия счетов за пределами Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.5', '3', 'Нарушение порядка открытия счетов за пределами Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.6', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.7', '1', 'Нарушение порядка ведения кассовых операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.7', '2', 'Нарушение порядка ведения кассовых операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.8', '0', 'Осуществление банком инвестиций в уставный фонд без согласования с Национальным банком Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.9', '1', 'Нарушение установленного порядка эмиссии и размещения ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.9', '2', 'Нарушение установленного порядка эмиссии и размещения ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.9', '3', 'Нарушение установленного порядка эмиссии и размещения ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.10', '1', 'Нарушение установленного порядка обращения ценных бумаг и осуществления профессиональной деятельности на рынке ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.10', '2', 'Нарушение установленного порядка обращения ценных бумаг и осуществления профессиональной деятельности на рынке ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.10', '3', 'Нарушение установленного порядка обращения ценных бумаг и осуществления профессиональной деятельности на рынке ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.10', '4', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.10', '5', 'Нарушение установленного порядка обращения ценных бумаг и осуществления профессиональной деятельности на рынке ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.11', '1', 'Нарушение установленного порядка осуществления депозитарной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.11', '2', 'Нарушение установленного порядка осуществления депозитарной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.11', '3', 'Исключена. Закон Республики Беларусь от 01.07.2010 № 146-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.12', '0', 'Исключена. Закон Республики Беларусь от 28.12.2009 № 98-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.13', '0', 'Исключена. Закон Республики Беларусь от 28.12.2009 № 98-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.14', '0', 'Исключена. Закон Республики Беларусь от 28.12.2009 № 98-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.15', '0', 'Исключена. Закон Республики Беларусь от 28.12.2009 № 98-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.16', '1', 'Нарушение порядка использования средств бюджета, государственных внебюджетных фондов либо организации государственных закупок товаров (работ, услуг)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.16', '2', 'Нарушение порядка использования средств бюджета, государственных внебюджетных фондов либо организации государственных закупок товаров (работ, услуг)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.16', '3', 'Нарушение порядка использования средств бюджета, государственных внебюджетных фондов либо организации государственных закупок товаров (работ, услуг)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.16', '4', 'Нарушение порядка использования средств бюджета, государственных внебюджетных фондов либо организации государственных закупок товаров (работ, услуг)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.16', '5', 'Нарушение порядка использования средств бюджета, государственных внебюджетных фондов либо организации государственных закупок товаров (работ, услуг)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.17', '1', 'Нарушение порядка предоставления, привлечения и использования заемных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.17', '2', 'Нарушение порядка предоставления, привлечения и использования заемных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.17', '3', 'Нарушение порядка предоставления, привлечения и использования заемных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.17', '4', 'Нарушение порядка предоставления, привлечения и использования заемных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.17', '5', 'Нарушение порядка предоставления, привлечения и использования заемных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.18', '0', 'Уклонение от погашения кредиторской задолженности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.19', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.21', '0', 'Нарушение установленных порядка и условий образования страховых резервов, осуществления инвестиций, размещения и использования ср-в страх. резервов, формирования, размещения и использования гарант. фондов, фондов предупредительных (превентивных) меропр.');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.23', '1', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.23', '2', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.23', '3', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.24', '0', 'Нарушение антимонопольного законодательства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.25', '0', 'Ограничение конкуренции');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.26', '0', 'Незаконное использование деловой репутации конкурента');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.28', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.30', '0', 'Противодействие выполнению функций временной администрации по управлению банком');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.31', '0', 'Неисполнение или ненадлежащее исполнение руководителем временной администрации по управлению банком обязанностей, установленных законодательством');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.32', '0', 'Нарушение банком или небанковской кредитно-финансовой организацией порядка перечисления денежных средств на счета нерезидентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.33', '0', 'Подделка проездных документов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.36', '0', 'Превышение суммы перечисленных денежных средств по импорту в сравнении с договорной суммой полученных денежных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.37', '1', 'Превышение сроков проведения внешнеторговых операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.37', '2', 'Превышение сроков проведения внешнеторговых операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.38', '0', 'Нарушение установленного порядка расчетов в белорусских рублях по экспортным внешнеторговым договорам');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.39', '1', 'Распоряжение денежными средствами от экспорта без зачисления на свой счет, а равно перечисление денежных средств со своего счета для оплаты за товары (охраняемую информацию, исключительные права на результаты интеллектуальной деятельности, работы, услуги)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.39', '2', 'Распоряжение денежными средствами от экспорта без зачисления на свой счет, а равно перечисление денежных средств со своего счета для оплаты за товары (охраняемую информацию, исключительные права на результаты интеллектуальной деятельности, работы, услуги)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.40', '0', 'Перечисление денежных средств от экспорта товаров (работ, услуг) без зачисления на свой счет без соответствующего разрешения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.42', '0', 'Представление недостоверных сведений при оформлении лицензии или других разрешительных документов на ввоз (вывоз) товаров, статистической декларации или периодической статистической декларации, регистрации сделки');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.43', '0', 'Нарушение установленного порядка проведения внешнеторговых операций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.44', '0', 'Нарушение установленного срока представления статистической декларации либо отсутствия такой декларации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.45', '0', 'Нарушение установленного срока аннулирования зарегистрированной таможенным органом статистической декларации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.46', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.47', '0', 'Использование иностранной валюты или ценных бумаг в иностранной валюте без разрешения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.48', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.49', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.54', '0', 'Неуплата или неполная уплата обязательных страховых взносов или взносов на профессиональное пенсионное страхование');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.59', '1', 'Незаконные действия с простыми и (или) переводными векселями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.59', '2', 'Незаконные действия с простыми и (или) переводными векселями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.59', '3', 'Незаконные действия с простыми и (или) переводными векселями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.60', '0', 'Непредставление, несвоевременное представление и (или) представление недостоверных сведений о выданных и (или) перечисленных денежных средствах, поступивших из-за границы');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.61', '0', 'Предоставление кредита для выплаты заработной платы, выдача или перечисление денежных средств для оплаты труда с нарушением требований законодательства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '1', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '2', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '3', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '4', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '5', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '6', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '7', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.64', '8', 'Нарушение порядка осуществления страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.65', '1', 'Невыполнение требований о заключении договора обязательного страхования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.65', '2', 'Невыполнение требований о заключении договора обязательного страхования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.65', '3', 'Невыполнение требований о заключении договора обязательного страхования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.66', '1', 'Нарушение страховым брокером или страховым агентом законодательства о страховании');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.66', '2', 'Нарушение страховым брокером или страховым агентом законодательства о страховании');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.66', '3', 'Нарушение страховым брокером или страховым агентом законодательства о страховании');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.66', '4', 'Нарушение страховым брокером или страховым агентом законодательства о страховании');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.66', '5', 'Нарушение страховым брокером или страховым агентом законодательства о страховании');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.67', '0', 'Нецелевое использование средств, заработанных на республиканских субботниках');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.68', '0', 'Нецелевое использование банковских кредитов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.69', '0', 'Нецелевое использование или использование с нарушением законодательства отчислений на капитальный ремонт');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.70', '0', 'Предоставление льготных условий инсайдерам или работникам банка или небанковской кредитно-финансовой организации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.71', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.72', '1', 'Невыполнение мер по предотвращению легализации доходов, полученных преступным путем,  финансирования террористической деятельности и финансирования распространения оружия массового поражения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.72', '2', 'Невыполнение мер по  предотвращению легализации доходв, полученных преступным путем, финансирования террористической деятельности и финансирования распространения оружия массового поражения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.73', '0', 'Незаконные использование либо разглашение сведений, внесенных в реестр владельцев ценных бумаг, или информации о результатах финансово-хозяйственной деятельности эмитента ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.74', '0', 'Нарушение порядка приема наличных денежных средств при осуществлении нотариальной и адвокатской деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.75', '0', 'Получение кредитного отчета без согласия субъекта кредитной истории');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.76', '0', 'Манипулирование рынком ценных бумаг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.77', '0', 'Нарушение требований к порядку осуществления закупок товаров (работ, услуг) за счет собственных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.78', '0', 'Нецелевое использование и (или) использование с нарушение законодательства об обращении с отходами средств, поступивших в виде платы за организацию сбора, обезвреживания и (или) использования отходов товаров и отходов упаковки');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.79', '0', 'Совершение финансовой операции, повлекшей легализацию доходов, полученных преступным путем');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.80', '0', 'Финансирование террористической деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.81', '0', 'Незаконное распоряжение денежными средствами, находящимися на банковских счетах субъекта хозяйствования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('11.82', '0', 'Нецелевое использование средств от продажи жилых помещений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.1', '1', 'Нарушение порядка ведения бухгалтерского учета и правил хранения бухгалтерских документов и иных документов, необходимых для исчисления и уплаты налогов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.1', '2', 'Нарушение порядка ведения бухгалтерского учета и правил хранения бухгалтерских документов и иных документов, необходимых для исчисления и уплаты налогов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.1', '3', 'Нарушение порядка ведения бухгалтерского учета и правил хранения бухгалтерских документов и иных документов, необходимых для исчисления и уплаты налогов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.2', '0', 'Нарушение порядка учета, сбора, хранения, транспортировки, использования, заготовки (закупки) или реализации металлопродукции, черных и цветных металлов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.3', '0', 'Нарушение порядка сдачи лома черных и цветных металлов и их отходов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.4', '1', 'Нарушение установленного порядка формирования и применения цен (тарифов)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.4', '2', 'Нарушение установленного порядка формирования и применения цен (тарифов)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.4', '3', 'Нарушение установленного порядка формирования и применения цен (тарифов)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.5', '1', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.5', '2', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.5', '3', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.7', '1', 'Незаконная предпринимательская деятельность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.7', '2', 'Незаконная предпринимательская деятельность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.7', '3', 'Незаконная предпринимательская деятельность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.7', '4', 'Незаконная предпринимательская деятельность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.7', '5', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.7', '11', 'Незаконная предпринимательская деятельность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.8', '0', 'Нарушение порядка осуществления предпринимательской деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.10', '1', 'Нарушение установленного порядка заключения и исполнения договоров на приобретение, строительство, реконструкцию жилых помещений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.10', '2', 'Нарушение установленного порядка заключения и исполнения договоров на приобретение, строительство, реконструкцию жилых помещений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.10', '3', 'Нарушение установленного порядка заключения и исполнения договоров на приобретение, строительство, реконструкцию жилых помещений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.10', '4', 'Нарушение установленного порядка заключения и исполнения договоров на приобретение, строительство, реконструкцию жилых помещений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.10', '5', 'Нарушение установленного порядка заключения и исполнения договоров на приобретение, строительство, реконструкцию жилых помещений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '1', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '2', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '3', 'Нарушение  законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '4', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '5', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '6', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '7', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '8', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '9', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.11', '10', 'Нарушение законодательства в сфере игорного бизнеса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.12', '0', 'Лжепредпринимательство (исключена)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '1', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '2', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '3', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '4', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '5', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '6', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '7', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '8', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.13', '9', 'Неправомерные деяния при принятии мер по предупреждению экономической несостоятельности (банкротства) или при осуществлении процедур экономической несостоятельности (банкротства)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.14', '0', 'Нарушение законодательства о товарных биржах и биржевой торговле');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.14', '1', 'Непредставление сведений о внебиржевой сделке, представление неполных или недостоверных сведений о внебиржевой сделке');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.14', '2', 'Непредставление сведений о внебиржевой сделке, представление неполных или недостоверных сведений о внебиржевой сделке');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.15', '1', 'Нарушение законодательства о рекламе');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.15', '2', 'Нарушение законодательства о рекламе');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.16', '0', 'Обман потребителей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '1', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '2', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '3', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '4', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '5', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '6', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '7', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '8', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '9', 'Нарушение правил торговли и  оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.17', '10', 'Нарушение правил торговли и оказания услуг населению');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.18', '0', 'Нарушение порядка приема денежных средств при реализации товаров (работ, услуг) за наличный расчет');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.19', '1', 'Нарушение порядка расчетов в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.19', '2', 'Нарушение порядка расчетов в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.19', '3', 'Нарушение порядка расчетов в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.19', '4', 'Нарушение порядка расчетов в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.20', '1', 'Нарушение порядка использования кассового оборудования, автоматических электронных аппаратов, торговых автоматов, платежных терминалов, использование и учета средств контроля, предназначенных для установки на кассовое оборудование');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.20', '2', 'Нарушение порядка использования кассового оборудования, автоматических электронных аппаратов, торговых автоматов, платежных терминалов, использование и учета средств контроля, предназначенных для установки на кассовом оборудование');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.21', '1', 'Нарушение порядка производства и учета алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.21', '2', 'Нарушение порядка производства и учета алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.21', '3', 'Нарушение порядка производства и учета алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.21', '4', 'Нарушение порядка производства и учета алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.21', '5', 'Нарушение порядка производства и учета алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.21', '6', 'Нарушение порядка производства и учета алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.22', '1', 'Нарушение порядка декларирования объемов производства и оборота алкогольной, непищевой спиртосодержащей продукции,  непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.22', '2', 'Нарушение порядка декларирования объемов производства и оборота алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '1', 'Нарушение порядка оборота,перемещения, транзита алкогольной, непищевой спиртосодержащей продукции,  непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '2', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции,  непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '3', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '4', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции,  непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '5', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '6', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции,  непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '7', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции,  непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '8', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции,  непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '9', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '10', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.23', '11', 'Нарушение порядка оборота, перемещения, транзита алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спитра, табачного сырья и табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.24', '0', 'Несоблюдение требований по проверке подлинности акцизных  марок Республики Беларусь и специальных марок на табачных изделиях  и алкогольных напитках');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.25', '1', 'Нарушение требований к качеству и безопасности алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий, к информации, содержащейся на потребительской упаковке алк. напитков и таб. изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.25', '2', 'Нарушение требований к качеству и безопасности алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий, к информации, содержащейся на потребительской упаковке алк. напитков и таб. изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.25', '3', 'Нарушение требований к качеству и безопасности алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий, к информации, содержащейся на потребительской упаковке алк. напитков и таб. изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.25', '4', 'Нарушение требований к качеству и безопасности алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий, к информации, содержащейся на потребительской упаковке алк. напитков и таб. изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.25', '5', 'Нарушение требований к качеству и безопасности алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачного сырья и табачных изделий, к информации, содержащейся на потребительской упаковке алк. напитков и таб. изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.26', '1', 'Нарушение законодательства о рекламе алк. напитков, пива, слабоалкогольных напитков, таб. изделий и порядка реализации алк. напитков и таб. изделий, запреты на розничную торговлю этиловым спиртом, пр-во и реализацию товаров, не являющихся таб. изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.26', '2', 'Нарушение законодательства о рекламе алк. напитков, пива, слабоалкогольных напитков, таб. изделий и порядка реализации алк. напитков и таб. изделий, запреты на розничную торговлю этиловым спиртом, пр-во и реализацию товаров, не являющихся таб. изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.26', '3', 'Нарушение законодательства о рекламе алк. напитков, пива, слабоалкогольных напитков, таб. изделий и порядка реализации алк. напитков и таб. изделий, запреты на розничную торговлю  этиловым спиртом, пр-во и реализацию товаров, не являющихся таб. изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.26', '4', 'Нарушение законодательства о рекламе алк. напитков, пива, слабоалкогольных напитков, таб. изделий и порядка реализации алк. напитков и таб. изделий, запреты на розничную торговлю этиловым спиртом, пр-во и реализацию товаров, не являющихся таб. изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.26', '5', 'Нарушение законодательства о рекламе алк. напитков, пива, слабоалкогольных напитков, таб. изделий и порядка реализации алк. напитков и таб. изделий, запреты на розничную торговлю этиловым спиртом, пр-во и реализацию товаров, не являющихся таб. изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.26', '6', 'Нарушение законодательства о рекламе алк. напитков, пива, слабоалкогольных напитков, таб. изделий и порядка реализации алк. напитков и таб. изделий, запреты на розничную торговлю этиловым спиртом, пр-во и реализацию товаров, не являющихся таб. изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.26', '7', 'Нарушение законодательства о рекламе алк. напитков, пива, слабоалкогольных напитков, таб. изделий и порядка реализации алк. напитков и таб. изделий, запреты на розничную торговлю этиловым спиртом, пр-во и реализацию товаров, не являющихся таб. изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.27', '1', 'Незаконные перемещение,  хранение табачных изделий и алкогольных напитков, производство, переработка, хранение, перемещение  непищевой спиртосодержащей продукции, этилового спирта, табачного сырья, реализация этих продукции, спирта, сырья и алк. напитков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.27', '2', 'Незаконные перемещение, хранение  табачных изделий и алкогольных напитков, производство, переработка и хранение , перемещение непищевой спиртосодержащей продукции, этилового спирта, табачного сырья, реализация этих продукции, спирта, сырья и алк. напитков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.27', '3', 'Незаконные перемещение, хранение  табачных изделий и алкогольных напитков, производство, переработка и хранение , перемещение непищевой спиртосодержащей продукции, этилового спирта, табачного сырья, реализация этих продукции,спирта, сырья, и алк. напитков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.27', '4', 'Незаконные  перемещение, хранение табачных изделий и алкогольных напитков, производство, переработка и хранение , перемещение непищевой спиртосодержащей продукции, этилового спирта, табачного сырья, реализация этих продукции, спирта, сырья и алк. напитков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.27', '5', 'Незаконные перемещение, хранение табачных изделий и алкогольных напитков, производство, переработка и хранение, перемещение непищевой спиртосодержащей продукции, этилового спирта, табачного сырья, реализация этих продукции, спирта, сырья и алк. напитков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.27', '6', 'Незаконные перемещение, хранение табачных изделий и алкогольных напитков, производство, переработка и хранение, перемещение непищевой спиртосодержащей продукции, этилового спирта, табачного сырья, реализвция этих продуктов, спирта, сырья и алкогольных нап');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.28', '1', 'Нарушение требований к  оптовой торговле алкогольной, непищевой спиртосодержащей продукцией,  непищевым этиловым спиртом, табачным сырьем и табачными изделиями, порядка отпуска (получения) и использования этилового спирта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.28', '2', 'Нарушение требований к оптовой  торговле алкогольной, непищевой спиртосодержащей продукцией, непищевым этиловым спиртом, табачным сырьем и табачными изделиями, порядка отпуска (получения) и использования этилового спирта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.28', '3', 'Нарушение требований к оптовой торговле алкогольной, непищевой спиртосодержащей продукцией, непищевым этиловым спиртом, табачным сырьем и табачными изделиями, порядка отпуска (получения) и использования этилового спирта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.29', '1', 'Нарушение порядка вывоза товаров из Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.29', '2', 'Нарушение порядка вывоза товаров из Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.30', '1', 'Незаконное обращение нефтяного жидкого топлива в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.30', '2', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.30', '3', 'Незаконное обращение нефтяного жидкого топлива в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.30', '4', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.30', '5', 'Незаконное обращение нефтяного жидкого топлива в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.30', '6', 'Незаконное обращение нефтяного жидкого топлива в Республике Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.31', '0', 'Уклонение от проведения обязательного аудита');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.32', '0', 'Исключена.. Закон Республики Беларусь от 30.11.2010 № 198-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.33', '0', 'Нарушение порядка допуска плательщиков единого налога к реализации товаров (работ, услуг)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.34', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.35', '0', 'Нарушение требований законодательства о маркировке товаров контрольными (идентификационными) знаками');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.36', '0', 'Неисполнение и (или) ненадлежащее исполнение правил осуществления риэлтерской деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.37', '1', 'Нарушение законодательных актов об аренде торговых мест');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.37', '2', 'Нарушение законодательных актов об аренде торговых мест');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.38', '0', ' (Исключена 12.07.2013 №64-З )Нарушение законодательства о книге учета движения товара');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.39', '1', 'Осуществление незаконной страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.39', '2', 'Осуществление незаконной страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.39', '3', 'Осуществление незаконной страховой деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.40', '0', 'Исключена. Закон Республики Беларусь от 28.12.2009 №98-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.41', '1', 'Нарушение требований по оценке строимости объектов гражданских прав');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.41', '2', 'Нарушение требований по оценке стоимости объектов гражданских прав');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.42', '0', 'Нарушение порядка организации и проведения культурно-зрелищных мероприятий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.43', '1', 'Изготовление или приобретение крепких алкогольных напитков (самогона), полуфабрикатов для их изготовления (браги), хранение аппаратов для их изготовления');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.43', '2', 'Изготовление или приобретение крепких алкогольных напитков (самогона), полуфабрикатов для их изготовления (браги), хранение аппаратов для их изготовления');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.43', '3', 'Изготовление или приобретение крепких алкогольных напитков (самогона), полуфабрикатов для их изготовления (браги), хранение аппаратов для их изготовления');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.44', '1', 'Нарушение порядка осуществления деятельности по организации и проведению электронных интерактивных игр');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.44', '2', 'Нарушение порядка осуществления деятельности по организации и проведению электронных интерактивных игр');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.45', '1', 'Нарушение порядка осуществления лотерейной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.45', '2', 'Нарушение порядка осуществления лотерейной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.46', '1', 'Незаконное использование генетически модифицированных составляющих (компонентов), непредоставление или предоставление недостоверных сведений о таких составляющих (компонентах)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.46', '2', 'Незаконное использование генетически модифицированных составляющих (компонентов), непредоставление или предоставление недостоверных сведений о таких составляющих (компонентах)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.47', '1', 'Нарушение законодательства об аккумулировании денежных средств в сфере строительства (реконструкции)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.47', '2', 'Нарушение законодательства об аккумулировании денежных средств в сфере строительства (реконструкции)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.48', '0', 'Нарушение порядка использования средств контроля за приборами учета алкогольной, непищевой спиртосодержащей продукции, непищевого этилового спирта, табачных изделий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.49', '1', 'Нарушение порядка оборота семян мака');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.49', '2', 'Нарушение порядка оборота семян мака');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.49', '3', 'Нарушение порядка оборота семян мака');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.49', '4', 'Нарушение порядка оборота семян мака');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.49', '5', 'Нарушение порядка оборота семян мака');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.49', '6', 'Нарушение порядка оборота семян мака');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('12.49', '7', 'Нарушение порядка оборота семян мака');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.1', '0', 'Нарушение срока постановки на учет в налоговом органе');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.2', '0', 'Осуществление деятельности без постановки на учет в налоговом органе');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.3', '0', ' ИСКЛЮЧЕНА 12.07.2013 №64-З .Нарушение срока представления информации об открытии (закрытии) счета в банке и (или) небанковской кредитно-финансовой организации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.3', '1', 'Исключена. Закон Республики Беларусь от 30.11.2010 № 198-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.4', '1', 'Нарушение срока представления налоговой декларации (расчета)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.4', '2', 'Нарушение срока представления налоговой декларации (расчета)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.4', '3', 'Нарушение срока представления налоговой декларации (расчета)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.4', '4', 'Нарушение срока представления налоговой декларации (расчета)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.5', '0', 'Отсутствие у налогового агента учета начисленных и выплаченных плательщику доходов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.5', '1', 'Исключена. Закон Республики Беларусь от 30.11.2010 № 198-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.5', '2', 'Исключена. Закон Республики Беларусь от 30.11.2010 № 198-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '1', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '2', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '3', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '4', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '5', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '6', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '7', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '8', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '9', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.6', '10', 'Неуплата или неполная уплата суммы налога, сбора (пошлины), таможенного платежа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.7', '1', 'Невыполнение или выполнение не в полном объеме обязанности по удержанию и (или) перечислению суммы налога, сбора (пошлины)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.7', '2', 'Невыполнение или выполнение не в полном объеме обязанности по удержанию и (или) перечислению суммы налога, сбора (пошлины)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.7', '3', 'Невыполнение или выполнение не в полном объеме обязанности по удержанию и (или) перечислению суммы налога, сбора (пошлины)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.7', '4', 'Невыполнение или выполнение не в полном объеме обязанности по удержанию и (или) перечислению суммы налога, сбора (пошлины)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.8', '1', 'Непредставление документов и иных сведений для осуществления налогового контроля либо представление недостоверных сведений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.8', '2', 'Непредставление документов и иных сведений для осуществления налогового контроля либо представление недостоверных сведений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.9', '0', 'Нарушение порядка открытия счета плательщику');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.10', '1', 'Нарушение порядка и (или) сроков исполнения поручений, решений органа Комитета государственного контроля Республики Беларусь, налогового или таможенного органа о перечислении, взыскании налога, сбора (пошлины), таможенного платежа, пени, а равно неисполне');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.10', '2', 'Нарушение порядка и (или) сроков исполнения поручений, решений органа Комитета государственного контроля Республики Беларусь, налогового или таможенного органа о перечислении, взыскании налога, сбора (пошлины), таможенного платежа, пени, а равно неисполне');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.10', '3', 'Нарушение порядка и (или) сроков исполнения поручений, решений органа Комитета государственного контроля Республики Беларусь, налогового или таможенного органа о перечислении, взыскании налога, сбора (пошлины), таможенного платежа, пени, а равно неисполне');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.10', '4', 'Нарушение порядка и (или) сроков исполнения поручений, решений органа Комитета государственного контроля Республики Беларусь, налогового или таможенного органа о перечислении, взыскании налога, сбора (пошлины), таможенного платежа, пени, а равно неисполне');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.11', '1', 'Неисполнение решения органа Комитета государственного контроля Республики Беларусь, налогового или таможенного органа о приостановлении операций по счетам плательщика, налогового агента, иного обязанного лица');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.11', '2', 'Неисполнение решения органа Комитета государственного контроля Республики Беларусь, налогового или таможенного органа о приостановлении операций по счетам плательщика, налогового агента, иного обязанного лица');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.13', '0', 'Отсутствие при реализации товаров, выполнении работ, оказании услуг документа об уплате единого налога или справки');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('13.14', '0', 'Необеспечение зачисления выручки, внереализационных доходов на счета в банках, небанковских кредитно-финансовых организациях и неосуществление платежей с них');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.1', '1', 'Перемещение товаров через таможенную границу Таможенного союза вне определенных законодательством мест или в неустановленное время');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.1', '2', 'Перемещение товаров через таможенную границу Таможенного союза вне определенных законодательством мест или в неустановленное время');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.2', '1', 'Недоставка, выдача (передача) без разрешения таможенного органа либо утрата находящихся под таможенным контролем товаров или утрата документов на них');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.2', '2', 'Недоставка , выдача (передача) без разрешения таможенного органа либо утрата находящихся под таможенным контролем товаров или утрата документов на них');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.2', '3', 'Недоставка, выдача (передача) без разрешения таможенного органа либо утрата находящихся под таможенным контролем товаров или утрата документов на них');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.3', '0', 'Покидание пункта ввоза  или вывоза  до завершения в отношении товаров  таможенных операций, связанных с выпуском этих товаров');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.4', '0', 'Нарушение  порядка убытия  товаров с таможенной территории, Таможенного союза');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.5', '1', 'Недекларирование  либо недостоверное декларирование товаров');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.5', '2', 'Недекларирование  либо недостоверное декларирование товаров');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.5', '3', 'Недекларирование либо недостоверное декларирование товаров');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.6', '0', 'Нарушение требований и условий таможенной процедуры, порядка использования и распоряжения условно выпущенными товарами');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.7', '1', 'Использование находящихся под таможенным контролем транспортных средств в нарушение установленного законодательством порядка');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.7', '2', 'Использование находящихся под таможенным контролем транспортных средств в нарушение установленного законодательством порядка');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.7', '3', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.8', '0', 'Нарушение сроков представления таможенной декларации, либо непредставление документтов, на основании которых заполнена таможенная декларация');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.9', '0', 'Нарушение порядка ведения учета товаров либо порядка представления отчетности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.10', '0', 'Несоблюдение порядка таможенного транзита');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.11', '0', 'Непринятие мер в случае аварии или действия непреодолимой силы');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.12', '0', 'Проведение операций с товарами без разрешения таможенного органа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.13', '0', 'Изменение, удаление, уничтожение,  замена, повреждение или утрата средств идентификации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.14', '0', 'Нарушение  требований и (или) условий временного хранения товаров');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.15', '0', 'Нарушение требований  законодательства к местам хранения товаров, находящихся под таможенным контролем');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('14.16', '0', 'Нарушение требований, предъявляемых к зонам таможенного контроля');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.1', '0', 'Нарушение нормативных правовых актов в области охраны окружающей среды');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.2', '0', 'Нарушение требований экологической безопасности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.3', '0', 'Нарушение порядка реализации проектных решений планируемой хозяйственной и иной деятельности, подлежащих государственной экологической экспертизе');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.4', '1', 'Нарушение правил безопасности при обращении с генно-инженерными организмами, экологически опасными веществами и отходами');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.4', '2', 'Нарушение правил безопасности при обращении с генно-инженерными организмами, экологически опасными веществами и отходами');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.5', '0', 'Нарушение требований к захоронению радиоактивных отходов, а также иных отходов, продуктов, материалов и других веществ, загрязненных радионуклидами');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.6', '0', 'Нарушение требований к использованию радиационно опасных земель');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.7', '0', 'Нарушение требований законодательства в области карантина и защиты растений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.8', '1', 'Нарушение требований по охране и использованию диких животных и дикорастущих растений, относящихся к видам, включенным в Красную книгу Республики Беларусь, мест их обитания и произрастания');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.8', '2', 'Нарушение требований по охране и использованию диких животных и дикорастущих растений, относящихся к видам, включенным в Красную книгу Республики Беларусь, мест их обитания и произрастания');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.9', '0', 'Нарушение режима охраны и использования особо охраняемых природных территорий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.10', '1', 'Нарушение порядка использования земли и требований по ее охране');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.10', '2', 'Нарушение порядка использования земли и требований по ее охране');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.10', '3', 'Нарушение порядка использования земли и требований по ее охране');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.11', '0', 'Порча земель');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.12', '0', 'Самовольное отступление от схем или проектов землеустройства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.13', '0', 'Уничтожение либо повреждение межевых знаков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.14', '0', 'Самовольное производство изыскательских работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.15', '0', 'Невыполнение требований по эксплуатации мелиоративных систем и гидротехнических сооружений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.16', '1', 'Нарушение установленного порядка производства топографо-геодезических и картографических работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.16', '2', 'Нарушение установленного порядка производства топографо-геодезических и картографических работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.17', '0', 'Уничтожение либо повреждение геодезических пунктов и маркшейдерских знаков или наблюдательных режимных скважин');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.18', '1', 'Нарушение требований по использованию недр');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.18', '2', 'Нарушение требований по использованию недр');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.19', '0', 'Невыполнение требований по обеспечению безопасности консервируемых или ликвидируемых горных выработок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.20', '0', 'Нарушение правил охраны недр');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.21', '1', 'Нарушение правил лесопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.21', '2', 'Нарушение правил лесопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.21', '3', 'Нарушение правил лесопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.21', '4', 'Нарушение правил лесопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.21', '5', 'Нарушение правил лесопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.22', '1', 'Незаконная рубка, незаконные удаление и пересадка, повреждение или уничтожение древесно-кустарниковой и иной растительности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.22', '2', 'Незаконная рубка, незаконные удаление и пересадка, повреждение или уничтожение древесно-кустарниковой и иной растительности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.22', '3', 'Незаконная рубка, незаконные удаление и пересадка, повреждение или уничтожение древесно-кустарниковой и иной растительности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.22', '4', 'Незаконная рубка, незаконные удаление и пересадка, повреждение или уничтожение древесно-кустарниковой и иной растительности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.23', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.24', '0', 'Нарушение правил использования участков земель лесного фонда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.25', '0', 'Повреждение сенокосов или пастбищных угодий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.26', '1', 'Нарушение правил заготовки, сбора или закупки грибов, других дикорастущих растений или их частей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.26', '2', 'Нарушение правил заготовки, сбора или закупки грибов, других дикорастущих растений или их частей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.26', '3', 'Нарушение правил заготовки, сбора или закупки грибов, других дикорастущих растений или их частей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.28', '0', 'Незаконный сбор и (или) уничтожение лесной подстилки, живого напочвенного покрова, снятие ( уничтожение) плодородного слоя почвы');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.29', '1', 'Нарушение требований пожарной безопасности в лесах или на торфяниках');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.29', '2', 'Нарушение требований пожарной безопасности в лесах или на торфяниках');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.30', '1', 'Загрязнение леса и иной древесно-кустарниковой растительности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.30', '2', 'Загрязнение леса и иной древесно-кустарниковой растительности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.31', '0', 'Уничтожение или повреждение лесохозяйственных знаков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.32', '1', 'Нарушение требований законодательства об охране и использовании животного мира');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.32', '2', ' Исключена законом от 12.07.2013 №64-З.Нарушение требований законодательства об охране и использовании животного мира');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.32', '3', 'Нарушение требований законодательства об охране и использовании животного мира');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.32', '4', 'Нарушение требований законодательства об охране и использовании животного мира');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.32', '5', 'Нарушение требований законодательства об охране и использовании животного мира');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.32', '6', 'Нарушение требований законодательства об охране и использовании животного мира');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.32', '7', 'Нарушение требований законодательства об охране и использовании животного мира');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.33', '0', 'Незаконные вывоз из Республики Беларусь или ввоз в нее диких животных и дикорастущих растений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.35', '1', 'Нарушение правил ведения рыболовного хозяйства и рыболовства, добычи других водных животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.35', '2', 'Нарушение правил ведения рыболовного хозяйства и рыболовства, добычи других водных животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.35', '3', 'Нарушение правил ведения рыболовного хозяйства и рыболовства, добычи других водных животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.36', '0', 'Незаконные изготовление, приобретение, хранение или сбыт орудий добычи рыбы и других водных животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.37', '1', 'Нарушение правил ведения охотничьего хозяйства и охоты');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.37', '2', 'Нарушение правил ведения охотничьего хозяйства и охоты');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.37', '3', 'Нарушение правил ведения охотничьего хозяйства и охоты');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.38', '1', 'Нарушение ветеринарных правил');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.38', '2', 'Нарушение ветеринарных правил');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.39', '1', 'Нарушение правил воспроизводства животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.39', '2', 'Нарушение правил воспроизводства животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.39', '3', 'Нарушение правил воспроизводства животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.40', '0', 'Нарушение правил учета племенных животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.41', '1', 'Нарушение правил производства, реализации или использования кормов, кормовых добавок и ветеринарных препаратов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.41', '2', 'Нарушение правил производства, реализации или использования кормов, кормовых добавок и ветеринарных препаратов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.42', '0', 'Нарушение требований по перевозке, хранению и использованию ветеринарных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.43', '0', 'Несоблюдение зоогигиенических и ветеринарно-санитарных требований при размещении, строительстве, реконструкции, вводе в эксплуатацию или эксплуатации объектов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.44', '0', 'Выпас домашних животных в неустановленных местах');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.45', '0', 'Жестокое обращение с животными');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.46', '1', 'Уклонение от проведения мероприятий по предупреждению болезней животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.46', '2', 'Уклонение от проведения мероприятий по предупреждению болезней животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.47', '1', 'Нарушение правил содержания домашних и (или) хищных животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.47', '2', 'Нарушение правил содержания домашних и (или) хищных животных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.48', '1', 'Загрязнение атмосферного воздуха');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.48', '2', 'Загрязнение атмосферного воздуха');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.49', '0', 'Невыполнение требований по оснащению газоочистными установками и системами контроля за выбросами загрязняющих веществ в атмосферный воздух');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.50', '0', 'Нарушение требований в области охраны атмосферного воздуха при выбросах загрязняющих веществ мобильными источниками выбросов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.51', '1', 'Загрязнение либо засорение вод');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.51', '2', 'Загрязнение либо засорение вод');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.51', '3', 'Загрязнение либо засорение вод');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.52', '1', 'Нарушение правил водопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.52', '2', 'Нарушение правил водопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.52', '3', 'Нарушение правил водопользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.53', '1', 'Нарушение правил эксплуатации водохозяйственных сооружений и устройств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.53', '2', 'Нарушение правил эксплуатации водохозяйственных сооружений и устройств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.54', '1', 'Повреждение водохозяйственных сооружений и устройств либо самовольное подключение к ним');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.54', '2', 'Повреждение водохозяйственных сооружений и устройств либо самовольное подключение к ним');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.54', '3', 'Повреждение водохозяйственных сооружений и устройств либо самовольное подключение к ним');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.55', '0', 'Ввоз в Республику Беларусь и вывоз из нее семян, растений, продукции растительного происхождения и иных материалов, не прошедших фитосанитарный контроль');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.56', '0', 'Нарушение законодательства о семенах');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.57', '0', 'Незаконное выжигание сухой растительности, трав на корню, а также стерни и пожнивных остатков на полях либо непринятие мер по ликвидации палов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.58', '0', 'Разведение костров в запрещенных местах');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.60', '0', 'Нарушение режима охраны и использования охранных зон вокруг стационарных пунктов гидрометеорологических наблюдений государственной сети гидрометеорологических наблюдений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.61', '1', 'Сокрытие, умышленное искажение и (или) несвоевременная передача сведений о состоянии и загрязнении окружающей среды, об источниках ее загрязнения, о состоянии природных ресурсов, об их использовании и охране');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.61', '2', 'Сокрытие, умышленное искажение и (или) несвоевременная передача сведений о состоянии и загрязнении окружающей среды, об источниках ее загрязнения, о состоянии природных ресурсов, об их использовании и охране');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.62', '0', 'Нарушение законодательства Республики Беларусь об охране озонового слоя');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.63', '1', 'Нарушение законодательства  об обращении с отходами');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.63', '2', 'Нарушение законодательства об обращении с отходами');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.64', '0', 'Нарушение требований законодательства о гидрометеорологической деятельности при производстве гидрометеорологической информации или выполнении отдельных работ и оказании услуг');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('15.65', '0', 'Нарушение порядка идентификации и регистрации сельскохозяйственных животных (стад)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.1', '0', 'Посев или выращивание запрещенных к возделыванию растений или грибов, содержащих наркотические средства или психотропные вещества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.2', '0', 'Сокрытие источника заражения венерическим заболеванием либо уклонение от обследования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.3', '1', 'Нарушение требований правового режима территории радиоактивного загрязнения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.3', '2', 'Нарушение требований правового режима территории радиоактивного загрязнения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.3', '3', 'Нарушение требований правового режима территории радиоактивного загрязнения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.4', '0', 'Нарушение правил радиационного контроля');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.5', '1', 'Применение радиационного оборудования, не прошедшего контроля технических характеристик либо находящегося в неисправном техническом состоянии, в диагностических либо лечебных целях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.5', '2', 'Применение радиационного оборудования, не прошедшего контроля технических характеристик либо находящегося в неисправном техническом состоянии, в диагностических либо лечебных целях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.6', '0', 'Нарушение нормативных правовых актов в области обеспечения ядерной и радиационной безопасности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.7', '0', 'Выпуск либо реализация недоброкачественной продукции');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.8', '0', 'Нарушение санитарно-эпидемиологических, гигиенических требований и процедур, установленных техническими регламентами, санитарных норм и правил, гигиенических нормативов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.9', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.10', '1', 'Незаконные действия с некурительными табачными изделиями, предназначенными для сосания и (или) жевания');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.10', '2', 'Незаконные действия с некурительными табачными изделиями, предназначенными для сосания и (или) жевания');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('16.10', '3', 'Незаконные действия с некурительными табачными изделиями, предназначенными для сосания и (или) жевания');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.1', '0', 'Мелкое хулиганство');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.2', '0', 'Стрельба из огнестрельного оружия в населенном пункте или в месте, не предназначенном для стрельбы');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.3', '1', 'Распитие алкогольных, слабоалкогольных напитков или пива, потребление наркотических средств,  психотропных веществ или их аналогов в общественном месте либо появление в общественном месте или на работе в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.3', '2', 'Распитие алкогольных, слабоалкогольных напитков или пива, потребление наркотических средств,  психотропных веществ или их аналогов в общественном месте либо появление в общественном месте или на работе в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.3', '3', 'Распитие алкогольных, слабоалкогольных напитков или пива, потребление наркотических средств,  психотропных веществ или их аналогов  в общественном месте либо появление в общественном месте или на работе в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.3', '4', 'Распитие алкогольных, слабоалкогольных напитков или пива, потребление наркотических средств, психотропных веществ или их аналогов в общественном месте либо появление в общественном месте или на работе в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.3', '5', 'Распитие алкогольных, слабоалкогольных напитков или пива, потребление наркотических средств, психотропных веществ или их аналогов в общественном месте либо появление в общественном месте или на работе в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.3', '6', 'Распитие алкогольных, слабоалкогольных напитков или пива, потребление наркотических средств, психотропных веществ или их аналогов в общественном месте либо появление в общественном месте или на работе в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.4', '0', 'Вовлечение несовершеннолетнего в антиобщественное поведение');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.5', '1', 'Занятие проституцией');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.5', '2', 'Занятие проституцией');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.6', '1', 'Заведомо ложное сообщение');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.6', '2', 'Заведомо ложное сообщение');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.8', '0', 'Распространение произведений, пропагандирующих культ насилия и жестокости');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.9', '0', 'Курение (потребление) табачных изделий в запрещенных местах');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.10', '0', 'Пропаганда и (или) публичное демонстрирование, изготовление и (или) распространение нацистской символики или атрибутики');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.11', '0', 'Изготовление, распространение и (или) хранение экстремистских материалов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.11', '1', 'Распространение, изготовление, хранение, перевозка информационной продукции, содержащей призывы к экстремистской деятельности или пропагандирующей такую деятельность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.11', '2', 'Распространение, изготовление, хранение, перевозка информационной продукции, содержащей призывы к экстремистской деятельности или пропагандирующей такую деятельность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.12', '0', 'Допуск на ночные дискотеки, в культурно-развлекательные (ночные) клубы несовершеннолетних');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.13', '1', ' Неисполнение обязанностей по сопровождению или обеспечению сопровождения несовершеннолетнего в ночное время вне жилища');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.13', '2', ' Неисполнение обязанностей по сопровождению или обеспечению сопровождения несовершеннолетнего в ночное время вне жилища');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.14', '0', 'Незаконное изготовление и (или) распространение методик либо иных материалов о способах изготовления взрывных устройств и взрывчатых веществ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('17.15', '0', 'Непринятие мер по недопущению потребления и распространения наркотических средств, психотропных веществ, их аналогов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.1', '0', 'Умышленное блокирование транспортных коммуникаций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.2', '0', 'Нарушение правил безопасности движения или эксплуатации железнодорожного, воздушного или водного транспорта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.3', '1', 'Нарушение правил, обеспечивающих безопасность движения на железнодорожном или городском электрическом транспорте');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.3', '2', 'Нарушение правил, обеспечивающих безопасность движения на железнодорожном или городском электрическом транспорте');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.3', '3', 'Нарушение правил, обеспечивающих безопасность движения на железнодорожном или городском электрическом транспорте');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.3', '4', 'Нарушение правил, обеспечивающих безопасность движения на железнодорожном или городском электрическом транспорте');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.3', '5', 'Нарушение правил, обеспечивающих безопасность движения на железнодорожном или городском электрическом транспорте');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.4', '1', 'Нарушение правил пользования средствами железнодорожного транспорта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.4', '2', 'Нарушение правил пользования средствами железнодорожного транспорта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.4', '4', 'Нарушение правил пользования средствами железнодорожного транспорта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.5', '1', 'Нарушение правил безопасности полетов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.5', '2', 'Нарушение правил безопасности полетов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.5', '3', 'Нарушение правил безопасности полетов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.5', '4', 'Нарушение правил безопасности полетов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.6', '1', 'Нарушение правил поведения на воздушном судне');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.6', '2', 'Нарушение правил поведения на воздушном судне');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.7', '0', 'Нарушение правил безопасности движения на водном транспорте');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '0', 'Нарушение правил безопасности движения и эксплуатации маломерных судов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '1', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '2', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '3', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '4', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '5', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '6', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '7', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.8', '8', 'Нарушение правил безопасности движения или эксплуатации маломерных судов, правил пользования базами (сооружениями) для их стоянок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.9', '1', 'Нарушение правил пользования транспортным средством');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.9', '3', 'Нарушение правил пользования транспортным средством');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.10', '1', 'Нарушение правил пользования метрополитеном');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.10', '2', 'Нарушение правил пользования метрополитеном');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.11', '0', 'Нарушение правил пожарной безопасности на транспорте общего пользования, на автомобильных дорогах и дорожных сооружениях');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '1', 'Нарушение правил эксплуатации транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '2', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '3', 'Нарушение правил эксплуатации транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '4', 'Нарушение правил эксплуатации транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '5', 'Нарушение правил эксплуатации транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '6', 'Нарушение правил эксплуатации транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '8', 'Нарушение правил эксплуатации транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.12', '9', 'Нарушение правил эксплуатации транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '1', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '2', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '3', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '4', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '5', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '6', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '7', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.13', '8', 'Превышение скорости движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '1', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '2', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '3', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '4', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '5', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '6', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '7', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '8', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '9', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '10', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '11', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.14', '12', 'Невыполнение требований сигналов регулирования дорожного движения, нарушение правил перевозки пассажиров или других правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.15', '0', 'Нарушение правил проезда железнодорожного переезда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.16', '1', 'Управление транспортным средством лицом, находящимся в состоянии опьянения, передача управления транспортным средством такому лицу либо отказ от прохождения проверки (освидетельствования)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.16', '3', 'Управление транспортным средством лицом, находящимся в состоянии опьянения, передача управления транспортным средством такому лицу либо отказ от прохождения проверки (освидетельствования)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.17', '1', 'Нарушение правил дорожного движения, повлекшее причинение потерпевшему легкого телесного повреждения, оставление места дорожно-транспортного происшествия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.17', '2', 'Нарушение правил дорожного движения, повлекшее причинение потерпевшему легкого телесного повреждения, оставление места дорожно-транспортного происшествия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.17', '4', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.18', '0', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.19', '1', 'Управление транспортным средством лицом, не имеющим права управления');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.19', '2', 'Управление транспортным средством лицом, не имеющим права управления');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.20', '1', 'Эксплуатация или допуск к участию в дорожном движении транспортного средства без договора обязательного страхования гражданской ответственности владельце транспортных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.20', '2', 'Эксплуатация или допуск к участию в дорожном движении транспортного средства без договора обязательного страхования гражданской ответственности владельца транспортных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.20', '3', 'Эксплуатация или допуск к участию в дорожном движении транспортного средства без договора обязательного страхования гражданской ответственности владельца транспортных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.20', '4', 'Эксплуатация или допуск к участию в дорожном движении транспортного средства без договора обязательного страхования гражданской ответственности владельца транспортных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.21', '1', 'Невыполнение требования об остановке транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.21', '2', 'Невыполнение требования об остановке транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.21', '3', 'Невыполнение требований об остановке транспортного средства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.22', '1', 'Нарушение правил остановки и стоянки транспортного средства, а также иных правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.22', '2', 'Нарушение правил остановки и стоянки транспортного средства, а также иных правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.22', '3', 'Нарушение правил остановки и стоянки транспортного средства, а также иных правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.22', '4', 'Нарушение правил остановки и стоянки транспортного средства, а также иных правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.22', '5', 'Нарушение правил остановки и стоянки транспортного средства, а также иных правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.22', '6', 'Нарушение правил остановки и стоянки транспортного средства, а также иных правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.22', '7', 'Нарушение правил остановки и стоянки транспортного средства, а также иных правил дорожного движения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.23', '1', 'Нарушение правил дорожного движения пешеходом и иными участниками дорожного движения либо отказ от прохождения проверки (освидетельствования)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.23', '2', 'Нарушение правил дорожного движения пешеходом и иными участниками дорожного движения либо отказ от прохождения проверки (освидетельствования)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.23', '3', 'Нарушение правил дорожного движения пешеходом и иными участниками дорожного движения либо отказ от прохождения проверки (освидетельствования)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.23', '4', 'Нарушение правил дорожного движения пешеходом и иными участниками дорожного движения либо отказ от прохождения проверки (освидетельствования)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.24', '0', 'Допуск к участию в дорожном движении транспортного средства, имеющего неисправности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.25', '1', 'Допуск к управлению транспортным средством водителя, находящегося в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.25', '2', 'Допуск к управлению транспортным средством водителя, находящегося в состоянии опьянения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.26', '1', 'Нарушение установленного режима труда и отдыха и требований к его учету при выполнении автомобильных перевозок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.26', '2', 'Нарушение  установленного режима труда и отдыха и требований к его учету при выполнении автомобильных перевозок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.26', '3', 'Нарушение установленного режима труда и отдыха и требований к его учету при выполнении автомобильных перевозок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.26', '4', 'Нарушение установленного режима труда и отдыха и требований к его учету при выполнении автомобильных перевозок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.28', '0', 'Ограничение прав на управление и пользование транспортным средством и его эксплуатацию');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.29', '1', 'Нарушение требований законодательства в области перевозки  опасных грузов, веществ и предметов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.29', '2', 'Нарушение требований законодательства в области перевозки опасных грузов, веществ и предметов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.29', '3', 'Нарушение требований законодательства в области перевозки опасных грузов, веществ и предметов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.30', '1', 'Безбилетный проезд');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.30', '2', 'Безбилетный проезд');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.30', '3', 'Безбилетный проезд');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.31', '0', 'Неоплаченный провоз ручной клади');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.32', '0', 'Провоз пассажира без билета или багажа без квитанции');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.33', '0', 'Нарушение водителем автомобиля-такси правил перевозки пассажиров');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.34', '0', 'Нарушение требований по обеспечению сохранности грузов на транспорте');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.35', '0', 'Повреждение либо загрязнение автомобильной дороги или иного дорожного сооружения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.36', '1', 'Нарушение порядка пользования автомобильными дорогами общего пользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.36', '2', 'Нарушение порядка пользования автомобильными дорогами общего пользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.36', '3', 'Нарушение порядка пользования автомобильными дорогами общего пользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.36', '4', 'Нарушение порядка пользования автомобильными дорогами общего пользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.36', '5', 'Нарушение порядка пользования автомобильными дорогами общего пользования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.36', '6', 'Исключена. Закон Республики Беларусь от 30.11.2010 № 198-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.37', '0', 'Нарушение землепользователем правил по охране автомобильных дорог и дорожных сооружений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.38', '0', 'Нарушение правил содержания дорог, улиц, железнодорожных переездов и других дорожных сооружений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.39', '0', 'Нарушение правил регистрации и учета судов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.40', '1', 'Нарушение правил охраны магистральных трубопроводов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.40', '2', 'Нарушение правил охраны магистральных трубопроводов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.41', '1', 'Нарушение правил использования воздушного пространства либо правил использования авиамоделей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.41', '2', 'Нарушение правил использования воздушного пространства либо правил использования авиамоделей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.42', '1', 'Осуществление международной автомобильной перевозки без разрешения или управление транспортным средством без международного сертификата технического осмотра');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.42', '2', 'Осуществление международной автомобильной перевозки без разрешения или управление транспортным средством без международного сертификата технического осмотра');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('18.43', '0', 'Нарушение порядка участия в дорожном движении тяжеловесных и (или) крупногабаритных транспортных средств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.1', '0', 'Несоблюдение требований законодательства об обращении с культурными ценностями, которым может быть придан статус историко-культурной ценности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.2', '0', 'Невыполнение обязанностей по установке охранных досок, составлению паспортов историко-культурных ценностей, подписанию и соблюдению требований охранных обязательств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.3', '0', 'Нарушение порядка и (или) условий выполнения работ на историко-культурных ценностях либо совершение действий, создающих угрозу историко-культурным ценностям');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.4', '0', 'Уничтожение, повреждение либо утрата историко-культурных ценностей или культурных ценностей, которым может быть придан статус историко-культурной ценности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.5', '0', 'Нарушение режимов содержания и (или) использования зон охраны недвижимых материальных историко-культурных ценностей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.6', '0', 'Несоблюдение требований об ограничении прав собственника историко-культурной ценности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.7', '0', 'Нарушение порядка вскрытия воинских захоронений либо проведения поисковых работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.8', '0', 'Незаконный поиск археологических артефактов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('19.9', '0', 'Незаконный оборот археологических артефактов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.1', '1', 'Нерациональное использование топливно-энергетических ресурсов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.1', '2', 'Нерациональное использование топливно-энергетических ресурсов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.1', '3', 'Нерациональное использование топливно-энергетических ресурсов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.2', '0', 'Нарушение правил, регламентирующих рациональное использование топливно-энергетических ресурсов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.3', '1', 'Нарушение правил охраны электрических сетей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.3', '2', 'Нарушение правил охраны электрических сетей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.4', '0', 'Пуск газа на газоиспользующие установки без разрешения органов, осуществляющих надзор за использованием газа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.5', '0', 'Эксплуатация газоиспользующей установки без ведения учета расхода газа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.6', '0', 'Нарушение требований по подготовке к работе резервного топливного хозяйства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.7', '0', 'Повреждение газопроводов (кроме магистральных)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.8', '0', 'Нарушение правил и норм безопасности при строительстве, эксплуатации и ремонте систем газоснабжения, магистральных газопроводов, нефтепроводов, нефтепродуктопроводов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.9', '0', 'Нарушение правил пользования газом в быту');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.10', '0', 'Нарушение правил пользования электрической или тепловой энергией');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.11', '0', 'Нарушение правил эксплуатации тепловых сетей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('20.12', '0', 'Нарушение правил эксплуатации электрических или теплоиспользующих установок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.1', '1', 'Отступление от утвержденного архитектурного проекта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.1', '2', 'Отступление от утвержденного архитектурного проекта');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.2', '1', 'Самовольное внесение изменений в утвержденный строительный проект или отступление от него');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.2', '2', 'Самовольное внесение изменений в утвержденный строительный проект или отступление от него');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.3', '1', 'Нарушение требований  технических нормативных правовых актов в области архитектурной, градостроительной и строительной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.3', '2', 'Нарушение требований технических нормативных правовых актов в области архитектурной, градостроительной и строительной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.4', '1', 'Нарушение требований проектной документации при проведении строительно-монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.4', '2', 'Нарушение требований  проектной  документации при проведении строительно-монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.5', '1', 'Подписание документов, содержащих сведения, не соответствующие фактическим состоянию или качеству строительно-монтажных работ, строительных материалов, изделий или конструкций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.5', '2', 'Подписание документов, содержащих сведения, не соответствующие фактическим состоянию или качеству строительно-монтажных работ, строительных материалов, изделий или конструкций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.6', '1', 'Нарушение порядка приемки в эксплуатацию объектов строительства или приемки строительных, специальных, монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.6', '2', 'Нарушение порядка приемки в эксплуатацию объектов строительства или приемки строительных, специальных, монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.6', '3', 'Нарушение порядка приемки в эксплуатацию объектов строительства или приемки строительных, специальных, монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.6', '4', 'Нарушение порядка приемки в эксплуатацию объектов строительства или приемки строительных, специальных, монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.6', '5', 'Нарушение порядка приемки в эксплуатацию объектов строительства или приемки строительных, специальных, монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.6', '6', 'Нарушение порядка приемки в эксплуатацию объектов строительства или приемки строительных, специальных, монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.6', '7', 'Нарушение порядка приемки в эксплуатацию объектов строительства или приемки строительных, специальных, монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.7', '1', 'Завышение объемов и (или) стоимости выполненных строительно-монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.7', '2', 'Завышение объемов и (или) стоимости выполненных строительно-монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.7', '3', 'Завышение объемов и (или) стоимости выполненных строительно-монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.7', '4', 'Завышение объемов и (или) стоимости выполненных строительно-монтажных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.8', '0', 'Ненадлежащее выполнение работ, повлекшее завышение объемов или стоимости выполненных строительно-монтажных работ и произведенных затрат');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.9', '0', 'Нарушение порядка представления информации об авариях зданий и сооружений и их расследования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.10', '0', 'Непредставление сведений об авариях на опасных производственных объектах');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.11', '0', 'Нарушение требований к содержанию строительной площадки');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.12', '0', 'Самовольное строительство');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.13', '0', 'Нарушение архитектурного решения фасада здания или сооружения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.14', '1', 'Нарушение правил благоустройства и содержания населенных пунктов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.14', '2', 'Нарушение правил благоустройства и содержания населенных пунктов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.15', '0', 'Нарушение порядка проведения раскопок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.16', '1', 'Нарушение правил пользования жилыми помещениями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.16', '2', 'Нарушение правил пользования жилыми помещениями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.17', '1', 'Нарушение порядка проведения процедур закупок при строительстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.17', '2', 'Нарушение порядка проведения процедур закупок при строительстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.17', '3', 'Нарушение порядка проведения процедур закупок при строительстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.18', '0', 'Нарушение сроков оформления и выдачи разрешительной документации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.19', '0', 'Нарушение законодательства в сфере строительства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.20', '1', 'Нарушение обязательств, предусмотренных договором строительного подряда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.20', '2', 'Нарушение обязательств, предусмотренных договором строительного подряда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.20', '3', 'Нарушение обязательств, предусмотренных договором строительного подряда');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.21', '0', 'Отступление в договоре строительного подряда от существенных условий, сформированных по результатам проведения процедур закупок');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.22', '0', 'Нарушение сроков выполнения проектных и изыскательных работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.23', '1', 'Невыполнение или ненадлежащее выполнение обязанностей при осуществлении технического или авторского надзора');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.23', '2', 'Невыполнение или ненадлежащее выполнение обязанностей при осуществлении технического или авторского надзора');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.24', '0', 'Нарушение порядка согласования проектной документации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.25', '0', 'Нарушение сроков разработки градостроительной документации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('21.26', '0', 'Нарушение сроков проектирования, строительства, технического переоснащения производств продукции деревообработки');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.2', '1', 'Нарушение порядка регистрации, ввоза на территорию Республики Беларусь радиоэлектронных средств и (или) высокочастотных устройств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.2', '2', 'Нарушение порядка регистрации, ввоза на территорию Республики Беларусь радиоэлектронных средств и (или) высокочастотных устройств');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.3', '1', 'Несоблюдение порядка использования радиочастотного спектра');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.3', '2', 'Несоблюдение порядка использования радиочастотного спектра');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.3', '3', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.4', '1', 'Нарушение правил охраны линий и сооружений связи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.4', '2', 'Нарушение правил охраны линий и сооружений связи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.5', '1', 'Самовольное использование сетей электросвязи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.5', '2', 'Самовольное использование сетей электросвязи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.6', '0', 'Несанкционированный доступ к компьютерной информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.7', '1', 'Нарушение правил защиты информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.7', '2', 'Нарушение правил защиты информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.7', '3', 'Нарушение правил защиты информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.7', '4', 'Нарушение правил защиты информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.8', '1', 'Незаконная деятельность в области защиты информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.8', '2', 'Незаконная деятельность в области защиты информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.9', '1', 'Нарушение законодательства о средствах массовой информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.9', '2', 'Нарушение законодательства о средствах массовой информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.9', '3', 'Нарушение законодательства о средствах массовой информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.9', '4', 'Нарушение законодательства о средствах массовой информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.10', '0', 'Незаконный отказ в доступе к архивному документу');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.11', '0', 'Нарушение законодательства  в сфере архивного дела и делопроизводства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.13', '0', 'Разглашение коммерческой или иной тайны');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.14', '0', 'Нарушение установленного порядка рассылки обязательных бесплатных экземпляров документов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.15', '0', 'Разглашение служебной тайны по неосторожности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.16', '1', 'Нарушение требований по использованию национального сегмента сети Интернет');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.16', '2', 'Нарушение требований по использованию национального сегмента сети Интернет');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.16', '3', 'Нарушение требований по использованию национального сегмента сети Интернет');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.16', '4', 'Нарушение требований по использованию национального сегмента сети Интернет');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('22.16', '5', 'Нарушение требований по использованию национального сегмента сети Интернет');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.1', '0', 'Неисполнение письменного требования (предписания)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.2', '0', 'Воспрепятствование проведению проверки, экспертизы');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.3', '0', 'Вмешательство в разрешение дела об административном правонарушении');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.4', '0', 'Неповиновение законному распоряжению или требованию должностного лица при исполнении им служебных полномочий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.5', '0', 'Оскорбление должностного лица при исполнении им служебных полномочий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.7', '1', 'Нарушение порядка льготного кредитования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.7', '2', 'Нарушение порядка льготного кредитования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.7', '3', 'Нарушение порядка льготного кредитования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.8', '1', 'Нарушение порядка  работы с имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.8', '2', 'Нарушение порядка  работы с имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.8', '3', 'Нарушение порядка  работы с имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.9', '1', 'Нарушение порядка декларирования доходов и имущества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.9', '2', 'Нарушение порядка декларирования доходов и имущества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.9', '0', 'Нарушение порядка декларирования доходов и имущества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.11', '1', 'Нарушение требований обязательного подтверждения соответствия продукции (работ, услуг) требованиям технических нормативных правовых актов в области технического нормирования и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.11', '2', 'Нарушение требований обязательного подтверждения соответствия продукции (работ, услуг) требованиям технических нормативных правовых актов в области технического нормирования и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.11', '3', 'Нарушение требований обязательного подтверждения соответствия продукции (работ, услуг) требованиям технических нормативных правовых актов в области технического нормирования и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.11', '4', 'Нарушение требований обязательного подтверждения соответствия продукции (работ, услуг) требованиям технических нормативных правовых актов в области технического нормирования и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.11', '5', 'Нарушение требований обязательного подтверждения соответствия продукции (работ, услуг) требованиям технических нормативных  правовых актов в области технического нормирования и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.11', '6', 'Нарушение требований обязательного подтверждения соответствия продукции (работ, услуг) требованиям технических нормативных правовых актов в области технического нормирования и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.11', '7', 'Нарушение требований обязательного подтверждения соответствия продукции (работ, услуг) требованиям технических нормативных правовых актов в области технического нормирования и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.12', '1', 'Нарушение требований законодательства о техническом нормировании и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.12', '2', 'Нарушение требований законодательства о техническом нормировании и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.12', '3', 'Нарушение требований законодательства о техническом нормировании и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.12', '4', 'Нарушение требований законодательства о техническом нормировании и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.12', '5', 'Нарушение требований законодательства о техническом нормировании и стандартизации, технических регламентов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.13', '1', 'Нарушение требований в области обеспечения  единства измерений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.13', '2', 'Нарушение требований в области обеспечения единства измерений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.14', '0', 'Незаконное проникновение на охраняемые объекты');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.15', '1', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.15', '2', 'Исключена. Закон Республики Беларусь от 08.01.2018 N 95-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.16', '0', 'Непредставление документов, отчетов и иных материалов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.18', '1', 'Нарушение порядка представления данных государственной статистической отчетности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.18', '2', 'Нарушение порядка представления данных государственной статистической отчетности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.18', '3', 'Нарушение порядка представления данных государственной статистической отчетности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.18', '4', 'Нарушение порядка представления данных государственной статистической отчетности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.20', '0', 'Нарушение установленного порядка регистрации финансовых операций, подлещащих особому контролю');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.21', '1', 'Нарушение порядка размещения заказов на изготовление бланков строгой отчетности, их изготовления и использования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.21', '2', 'Нарушение порядка размещения заказов на изготовление бланков строгой отчетности, их изготовления и использования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.21', '3', 'Нарушение порядка размещения заказов на изготовление бланков строгой отчетности, их изготовления и использования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.23', '1', 'Нарушение порядка использования иностранной безвозмездной помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.23', '2', 'Нарушение порядка использования иностранной безвозмездной помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.23', '3', 'Нарушение порядка использования иностранной безвозмездной помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.24', '1', 'Нарушение законодательства об иностранной безвозмездной помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.24', '2', 'Нарушение законодательства об иностранной безвозмездной помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.25', '0', 'Нарушение порядка ведения государственного кадастра');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.26', '1', 'Нарушение законных прав депутата Палаты представителей, члена Совета Республики Национального собрания Республики Беларусь, депутата местного Совета депутатов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.26', '2', 'Нарушение законных прав депутата Палаты представителей, члена Совета Республики Национального собрания Республики Беларусь, депутата местного Совета депутатов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.27', '1', 'Нарушение законодательства при распоряжении государственным имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.27', '2', 'Нарушение законодательства при распоряжении государственным имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.27', '3', 'Нарушение законодательства при распоряжении государственным имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.27', '4', 'Нарушение законодательства при распоряжении государственным имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.27', '5', 'Нарушение законодательства при распоряжении государственным имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.27', '6', 'Нарушение законодательства при распоряжении государственным имуществом');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.28', '0', 'Нарушение порядка проведения экспертизы');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.29', '0', 'Незаконное пересечение Государственной границы Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.30', '0', 'Нарушение пограничного режима');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.30', '1', 'Нарушение пограничного режима');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.30', '2', 'Нарушение пограничного режима');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.31', '1', 'Нарушение режима Государственной границы Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.31', '2', 'Нарушение режима Государственной границы Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.31', '3', 'Нарушение режима Государственной границы Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.31', '4', 'Нарушение режима Государственной границы Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.31', '5', 'Исключена. Закон Республики Беларусь от 30.11.2010 № 198-З');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.32', '0', 'Нарушение режима в пунктах пропуска через Государственную границу Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.32', '1', 'Нарушение режима в пунктах пропуска через Государственную границу Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.32', '2', 'Нарушение режима в пунктах пропуска через Государственную границу Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.33', '0', 'Распространение средствами массовой информации заведомо ложных сведений, порочащих честь и достоинство Президента Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.34', '1', 'Нарушение порядка организации или проведения массовых мероприятий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.34', '2', 'Нарушение порядка организации или проведения массовых мероприятий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.34', '3', 'Нарушение порядка организации или проведения массовых мероприятий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.34', '4', 'Нарушение порядка организации или проведения массовых мероприятий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.34', '5', 'Нарушение порядка организации или проведения массовых мероприятий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.35', '0', 'Умышленные повреждение или срыв печати (пломбы)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.36', '0', 'Нарушение  порядка приобретения  печатного оборудования');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.37', '0', 'Утрата или незаконное уничтожение документов постоянного или временного  хранения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.38', '1', 'Нарушение установленного порядка сдачи печатей и штампов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.38', '2', 'Нарушение установленного порядка сдачи печатей и штампов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.39', '0', 'Самоуправство');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.39', '1', 'Самоуправство');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.39', '2', 'Самоуправство');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.40', '0', 'Незаконное пользование эмблемой или наименованием Красного Креста, Красного Полумесяца, Красного Кристалла');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.41', '0', 'Самовольное занятие земельного участка');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.42', '0', 'Нарушение сроков возврата временно занимаемых земель');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.43', '0', 'Самовольное захоронение, перезахоронение');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.43', '1', 'Нарушение законодательства о погребении');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.43', '2', 'Нарушение законодательства о погребении');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.44', '0', 'Незаконные действия по отношению к государственным наградам Республики Беларусь или СССР');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.44', '1', 'Незаконные действия в отношении государственных наград');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.44', '2', 'Незаконные действия в отношении государственных наград');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.45', '1', 'Незаконные изготовление, реализация и ношение формы одежды и знаков различия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.45', '2', 'Незаконные изготовление, реализация и ношение формы одежды и знаков различия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.45', '3', 'Незаконные изготовление, реализация и ношение формы одежды и знаков различия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.46', '0', 'Незаконные действия в отношении газового, пневматического или метательного оружия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.47', '0', 'Незаконные действия в отношении холодного оружия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.48', '1', 'Нарушение правил обращения с огнестрельным оружием, взрывоопасными, легковоспламеняющимися, едкими веществами или пиротехническими изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.48', '2', 'Нарушение правил обращения с огнестрельным оружием, взрывоопасными, легковоспламеняющимися, едкими веществами или пиротехническими изделиями');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.49', '0', 'Нарушение сроков регистрации (перерегистрации) огнестрельного или газового оружия либо правил постановки его на учет');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.50', '0', 'Уклонение от реализации огнестрельного оружия или боеприпасов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.51', '0', 'Установка на гражданском или служебном оружии приспособления для бесшумной стрельбы или прицела (прицельного комплекса) ночного видения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.52', '1', 'Нарушение правил оборота специальных технических средств, предназначенных для негласного получения информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.52', '2', 'Нарушение правил оборота специальных технических средств, предназначенных для негласного получения информации');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.53', '1', 'Проживание без регистрации либо без документов, удостоверяющих личность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.53', '2', 'Проживание без регистрации либо без документов, удостоверяющих личность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.53', '3', 'Проживание без регистрации либо без документов, удостоверяющих личность');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.54', '1', 'Незаконное изъятие документа, удостоверяющего личность, или принятие его в залог');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.54', '2', 'Незаконное изъятие документа, удостоверяющего личность, или принятие его в залог');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.55', '1', 'Нарушение законодательства о правовом положении иностранных граждан и лиц без гражданства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.55', '2', 'Нарушение законодательства о правовом положении иностранных граждан и лиц без гражданства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.55', '3', 'Нарушение законодательства о правовом положении иностранных граждан и лиц без гражданства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.55', '4', 'Нарушение законодательства о правовом положении иностранных граждан и лиц без гражданства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.55', '5', 'Нарушение законодательства о правовом положении иностранных граждан и лиц без гражданства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.55', '6', 'Нарушение законодательства о правовом положении иностранных граждан и лиц без гражданства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.56', '1', 'Нарушение законодательства о пожарной безопасности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.56', '2', 'Нарушение законодательства о пожарной безопасности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.57', '0', 'Нарушение условий и правил осуществления охранной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.58', '1', 'Нарушение законодательства в области защиты населения и территорий от чрезвычайных ситуаций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.58', '2', 'Нарушение законодательства в области защиты населения и территорий от чрезвычайных ситуаций');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.59', '0', 'Нарушение законодательства  о чрезвычайном или военном положении');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.60', '0', 'Неисполнение военно-транспортной обязанности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.61', '1', 'Нарушение требований по безопасному ведению работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.61', '2', 'Нарушение требований по безопасному ведению работ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.62', '0', 'Нарушение правил учета, хранения, транспортирования или использования взрывчатых материалов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.63', '0', 'Купание в запрещенных местах');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.64', '1', 'Нарушение порядка регистрации юридических лиц и индивидуальных предпринимателей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.64', '2', 'Нарушение порядка регистрации юридических лиц и индивидуальных предпринимателей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.65', '0', 'Незаконное проведение кастингов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.67', '0', 'Нарушение запрета органов государственного надзора за соблюдением технических регламентов или органа государственного метрологического надзора');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.68', '0', 'Нарушение порядка осуществления ремесленной деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.69', '0', 'Нарушение нотариусом сроков совершения нотариальных действий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.70', '0', 'Нарушение порядка представления сведений и (или) документов, необходимых для совершения нотариальных действий');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.71', '0', 'Незаконные действия в отношении охотничьего огнестрельного гладкоствольного оружия');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.72', '0', 'Невнесение предложений об отмене государственной поддержки');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.73', '0', 'Непредставление либо несвоевременное представление документов, связанных с изменением вещных прав на простые и (или) переводные векселя');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.74', '1', 'Нарушение порядка осуществления деятельности по оказанию услуг в сфере агроэкотуризма');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.74', '2', 'Нарушение порядка осуществления деятельности по оказанию услуг в сфере агроэкотуризма');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.75', '0', 'Нарушение установленного порядка создания страховыми организациями и страховыми брокерами обособленных подразделений, а также организаций за пределами Республики Беларусь для осуществления деятельности в области страхования либо приобретения долей в устав');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.77', '1', 'Невыполнение обязанности по обращению за государственной регистрацией  в отношении объектов недвижимого имущества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.77', '2', 'Невыполнение обязанности по обращению за государственной регистрацией в отношении объектов недвижимого имущества');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.78', '1', 'Нарушение жилищного законодательства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.78', '2', 'Нарушение жилищного законодательства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.78', '3', 'Нарушение жилищного законодательства');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.79', '0', 'Невнесение записей о проведении проверки в книгу учета проверок (журнал производства работ) либо нарушения порядка назначения проверки');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.80', '1', 'Нарушение порядка предоставления и изъятия земельных участков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.80', '2', 'Нарушение порядка предоставления и изъятия земельных участков');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.81', '0', 'Незаконное делегирование полномочий на государственное регулирование предпринимательской деятельности либо на контроль за ней');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.82', '0', 'Воспрепятствование законной предпринимательской деятельности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.83', '0', 'Нарушение порядка проведения конкурсов и аукционов');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.84', '1', 'Нарушение порядка предоставления и использования безвозмездной (спонсорской) помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.84', '2', 'Нарушение порядка предоставления и использования безвозмездной (спонсорской) помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.84', '3', 'Нарушение порядка предоставления и использования безвозмездной (спонсорской) помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.84', '4', 'Нарушение порядка предоставления и использования безвозмездной (спонсорской) помощи');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.85', '0', 'Незаконные действия по отношению к государственным символам Республики Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.86', '1', 'Нарушение порядка предоставления жилых помещений, построенных (реконструированных) или приобретенных с привлечением льготного кредита, по договору найма или аренды');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.86', '2', 'Нарушение порядка предоставления жилых помещений, построенных (реконструированных) или приобретенных с привлечением льготного кредита, по договору найма или аренды');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.87', '1', 'Незаконный ввоз лиц  в Республику Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('23.87', '2', 'Незаконный ввоз лиц в Республику Беларусь');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.1', '0', 'Неуважение к суду');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.2', '0', 'Воспрепятствование явке в суд народного заседателя');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.3', '0', 'Непринятие мер по частному определению (постановлению) суда или представлению об устранений нарушений законодательства, причин и условий, способствующих совершению правонарушений');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.4', '0', 'Заведомо ложные объяснение либо заявление');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.5', '0', 'Отказ либо уклонение свидетеля или потерпевшего от дачи объяснений либо эксперта или переводчика от исполнения возложенных на них обязанностей');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.6', '0', 'Уклонение от явки в орган, ведущий административный или уголовный процесс, либо к судебному исполнителю');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.7', '1', 'Несообщение либо непредставление доказательств в суд, а равно несообщение о перемене адреса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.7', '2', 'Несообщение либо непредставление доказательств в суд, а равно несообщение о перемене адреса');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.8', '0', 'Несоблюдение мер по обеспечению иска,исполнения исполнительного документа');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.9', '1', 'Нарушение лицом, не являющимся должником, законодательства об исполнительном  производстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.9', '2', 'Нарушение лицом, не являющимся должником, законодательства об исполнительном производстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.9', '3', 'Нарушение лицом, не являющимся должником, законодательства об исполнительном производстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.9', '4', 'Нарушение лицом, не являющимся должником, законодательства об исполнительном производстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.10', '1', 'Нарушение должником законодательства об исполнительном производстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.10', '2', 'Нарушение должником законодательства об исполнительном производстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.10', '3', 'Нарушение должником законодательства об исполнительном производстве');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.11', '0', 'Передача предметов или веществ лицу, содержащемуся в следственном изоляторе, исправительном учреждении, исполняющем наказание в виде лишения свободы, или арестном доме, либо получение от него предметов и веществ');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.12', '1', 'Несоблюдение требований превентивного надзора или профилактического наблюдения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.12', '2', 'Несоблюдение требований превентивного надзора или профилактического наблюдения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('24.12', '3', 'Несоблюдение требований превентивного надзора или профилактического наблюдения');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.1', '1', 'Неявка в военный комиссариат (обособленное подразделение военного комиссариата) или на мероприятия по призыву');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.1', '2', 'Неявка в военный комиссариат (обособленное подразделение военного комиссариата)  или на мероприятия по призыву');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.1', '3', 'Неявка в военный комиссариат (обособленное подразделение военного комиссариата) или на мероприятия по призыву');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.2', '1', 'Непредставление в военный комиссариат  (обособленное подразделение военного комиссариата) списков граждан, подлежащих приписке к призывным участкам');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.2', '2', 'Непредставление в военный комиссариат (обособленное подразделение военнолго комиссариата) списков граждан, подлежащих приписке к призывным участкам');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.3', '1', 'Неоповещение допризывника, призывника и военнообязанного о вызове в военный комиссариат (обособленное подразделение военного комиссариата)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.3', '2', 'Неоповещение допризывника, призывника и военнообязанного о вызове в военный комиссариат (обособленное подразделение военного комиссариата)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.4', '1', 'Несвоевременное представление документов, необходимых для ведения  воинского учета призывников и военнообязаных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.4', '2', 'Несвоевременное представление документов, необходимых для ведения воинского учета призывников и военнообязанных');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.8', '1', 'Нарушение обязанностей по воинскому учету');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('25.8', '2', 'Нарушение обязанностей по воинскому учету');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 1', '9', 'Декрет № 1 п.9 (утратил силу с 23.02.2015)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 1', '10', 'Декрет № 1 п.10 (утратил силу с 23.02.2015)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 11', '0', 'Декрет № 11 (утратил силу с 16.01.2014)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 24', '0', 'Декрет № 24 (утратил силу с 02.04.2007)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 28', '0', 'Декрет № 28 (утратил силу с 02.04.2007)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 114', '0', 'Указ № 114');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 222', '0', 'Указ № 222');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 368', '0', 'Указ № 368 (утратил силу с 08.01.2008)');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '4', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '5', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '6', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '7', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '8', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '9', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '10', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '11', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '12', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '13', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ № 26', '14', 'Указ № 26');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 6', '111', 'Декрет № 6');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 6', '112', 'Декрет № 6');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 6', '113', 'Декрет № 6');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 6', '114', 'Декрет № 6');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 6', '115', 'Декрет № 6');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет № 6', '116', 'Декрет № 6');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет №5', '2', 'Декрет №5');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Декрет №3', '0', 'Декрет №3');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ №48', '0', 'Указ №48');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Указ №49', '0', 'Указ №49');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('86.1', '0', 'Освобождение от уголовной ответственности с привлечением лица к административной ответственности');
INSERT INTO `article_adm` (`article`, `part`, `note`) VALUES ('Прочие', '9', 'Прочие');


INSERT INTO `organization` (`name`, `type`) VALUES ('Витебский областной суд', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Бешенковичского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Браславского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Верхнедвинского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Витебского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Глубокского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Городокского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Докшицкого района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Дубровенского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Железнодорожного района г. Витебска', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Лепельского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Лиозненского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Миорского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Октябрьского района г. Витебска', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Оршанского района и г. Орши', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Первомайского района г. Витебска', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Полоцкого района и г. Полоцка', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Поставского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Россонского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Сенненского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Толочинского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Ушачского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Чашникского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Шарковщинского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд Шумилинского района', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Суд г. Новополоцка', '1');
INSERT INTO `organization` (`name`, `type`) VALUES ('Организация 1', '2');
INSERT INTO `organization` (`name`, `type`) VALUES ('Организация 2', '2');
INSERT INTO `organization` (`name`, `type`) VALUES ('Организация 3', '2');


INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Хамиченок Н.Н.', 'Председатель', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Фоменко А.Г.', 'Первый заместитель председателя', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Бондарев С.А.', 'Заместитель председателя', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Федюкевич А.И.', 'Заместитель председателя', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Абашин А.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Бондал Г.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Буева В.М.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Бурунов Е.И.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Губанов Д.М.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Давлюд Е.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Дашкевич Т.А.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Дроздов А.В,', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Иванова С.П.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Ларина Л.С.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Мартиросян Э.С.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Прейс А.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Синицына Л.И.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Смолякова И.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Урбанович Г.Н.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Колесник И.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Лях Н.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Острикова М.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Сазонова Н.М.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Федоров О.С.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Быстров В.В.', 'Судья', '1', '1');
INSERT INTO `author_document` (`name`, `position`, `activ_work`, `organization_id`) VALUES ('Хилькевич Н.Ф.', 'Судья', '1', '1');


INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Предупреждение');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Штраф');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Исправительные рабты');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Административный арест');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Лишение специального права');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Лишение права заниматься определенной деятельностью');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Конфискация');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Депортация');
INSERT INTO `name_entity_decree_adm` (`name`) VALUES ('Взыскание стоимости');

INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('1', 'Примечание по постановлению 1');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('2', 'Примечание по постановлению 2');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('3', 'Примечание по постановлению 3');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('4', 'Примечание по постановлению 4');
INSERT INTO `entity_decree_adm` (`name_entity_decree_id`, `prim`) VALUES ('5', 'Примечание по постановлению 5');

INSERT INTO `entity_isk_adm` (`name`) VALUES ('По жалобе лица, в отношении которого вынесено постановление');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('По жалобе потепревшего');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('По жалобе представителя потерпевшего');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('По жалобе представителя юридического лица');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('По жалобе защитника');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('По жалобе руководителя органа, направившего дело в суд');
INSERT INTO `entity_isk_adm` (`name`) VALUES ('По протесту прокурора');

INSERT INTO `result_adm` (`name`) VALUES ('Оставлено без изменения, а жалоба (протест) - без удовлетворения');
INSERT INTO `result_adm` (`name`) VALUES ('Отменено полностью или в части и направлено на новое рассмотрение');
INSERT INTO `result_adm` (`name`) VALUES ('Отменено полностью или в части и прекращено дело');
INSERT INTO `result_adm` (`name`) VALUES ('Отменено последнее по времени постановление, и оставлено в силе одно из ранее вынесенных постановлений');
INSERT INTO `result_adm` (`name`) VALUES ('Изменено постановление');

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


