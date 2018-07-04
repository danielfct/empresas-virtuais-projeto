INSERT INTO Cliente(email, password, username, nome, telefone, telemovel, morada) VALUES ('admin','admin','admin','admin','','','');

INSERT INTO Pais VALUES ('P','Portugal','Lisboa');

INSERT INTO Cidade VALUES ('Lisboa','P');
INSERT INTO Cidade VALUES ('Braga','P');
INSERT INTO Cidade VALUES ('Coimbra','P');
INSERT INTO Cidade VALUES ('Porto','P');
INSERT INTO Cidade VALUES ('Setubal','P');
INSERT INTO Cidade VALUES ('Amadora','P');
INSERT INTO Cidade VALUES ('Vila Nova de Gaia','P');
INSERT INTO Cidade VALUES ('Barreiro','P');
INSERT INTO Cidade VALUES ('Funchal','P');
INSERT INTO Cidade VALUES ('Almada','P');
INSERT INTO Cidade VALUES ('Oeiras','P');
INSERT INTO Cidade VALUES ('Aveiro','P');
INSERT INTO Cidade VALUES ('Odemira','P');

INSERT INTO Localidade VALUES ('Ericeira','Lisboa','P');
INSERT INTO Localidade VALUES ('Porto','Porto','P');
INSERT INTO Localidade VALUES ('Lisboa','Lisboa','P');
INSERT INTO Localidade VALUES ('Algés','Oeiras','P');
INSERT INTO Localidade VALUES ('Vila Nova de Gaia','Porto','P');
INSERT INTO Localidade VALUES ('Funchal','Funchal','P');
INSERT INTO Localidade VALUES ('Esmoriz','Aveiro','P');
INSERT INTO Localidade VALUES ('Zambujeira do Mar','Odemira','P');

INSERT INTO EntidadePublica VALUES ('Policia Municipal de Lisboa','+351 808 202 036','P','Lisboa','Autoridade');
INSERT INTO EntidadePublica VALUES ('GNR Posto Territorial de Trafaria','+351 265 242 596','P','Almada','Autoridade');
INSERT INTO EntidadePublica VALUES ('INEM','+351 213 508 100','P','Lisboa','Paramédico');
INSERT INTO EntidadePublica VALUES ('Bombeiros Voluntários da Trafaria','+351 212 950 093','P','Almada','Bombeiro');

INSERT INTO Festival VALUES ('1', 'Sumol Summer Fest 2018', 'P', 'Lisboa', 'Ericeira', '2018-07-06', '2018-07-07', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/sumolsummerfest2018.png'));

INSERT INTO Festival VALUES ('2', 'NOS Primavera Sound 2018', 'P', 'Porto', 'Porto', '2018-06-07', '2018-06-09', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/nosprimaverasound2018.jpg'));

INSERT INTO Festival VALUES ('3', 'Rock in Rio Lisboa 2018', 'P', 'Lisboa', 'Lisboa', '2018-06-23', '2018-06-24', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/rockinriolisboa2018.jpg'));

INSERT INTO Festival VALUES ('4', 'NOS Alive 2018', 'P', 'Oeiras', 'Algés', '2018-07-12', '2018-07-13', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/nosalive2018.png'));

INSERT INTO Festival VALUES ('5', 'Super Bock Super Rock 2018', 'P', 'Lisboa', 'Lisboa', '2018-07-19', '2018-07-20', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/superbocksuperrock2018.png'));

INSERT INTO Festival VALUES ('6', 'MEO Marés Vivas 2018', 'P', 'Porto', 'Vila Nova de Gaia', '2018-07-20', '2018-07-22', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/meomaresvivas2018.png'));

INSERT INTO Festival VALUES ('7', 'NOS Summer Opening 2018', 'P', 'Funchal', 'Funchal', '2018-07-20', '2018-07-21', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/nossumeropening2018.jpg'));

INSERT INTO Festival VALUES ('8', 'Sound Waves 2018', 'P', 'Aveiro', 'Esmoriz', '2018-07-18', '2018-07-18', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/soundwaves2018.jpg'));

INSERT INTO Festival VALUES ('9', 'Sumol Summer Fest 2018', 'P', 'Odemira', 'Zambujeira do Mar', '2018-08-08', '2018-08-09', 
	LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/meosudoeste2018.jpg'));

INSERT INTO Imagem VALUES ('1', LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/imagem1.jpg'));
INSERT INTO Imagem VALUES ('2', LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/imagem2.jng'));
INSERT INTO Imagem VALUES ('3', LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/imagem3.jng'));
INSERT INTO Imagem VALUES ('4', LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/imagem4.jng'));
INSERT INTO Imagem VALUES ('5', LOAD_FILE('C:/Users/ASUS/Desktop/Projeto EVr/source/server/db/images/imagem5.jng'));

INSERT INTO EMPRESA(email,password,nome,telefone,pais,cidade,localidade,numtrabalhadores,zonaoperacao,tipo,pedidoAprovado) 
VALUES ('danielpimenta@gmail.com','daniel','Daniel','911111111','P','Lisboa','Lisboa','1','100','Logistico',0);

INSERT INTO EMPRESA(email,password,nome,telefone,pais,cidade,localidade,numtrabalhadores,zonaoperacao,tipo,pedidoAprovado) 
VALUES ('outraempresa@gmail.com','empresa','Empresa','911111111','P','Lisboa','Lisboa','1','100','Logistico',0);