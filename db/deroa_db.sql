CREATE DATABASE IF NOT EXISTS deroa;
USE deroa;

CREATE TABLE resources(
	id_resource INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    url_resource TEXT NOT NULL, 
    description TEXT NOT NULL,
    level VARCHAR(255) NOT NULL
);

CREATE TABLE author(
    id_author INT AUTO_INCREMENT PRIMARY KEY,
    name_author VARCHAR(100) NOT NULL, 
    url_author TEXT NOT NULL,
    fk_resource INT,
    UNIQUE(id_author),
    FOREIGN KEY(fk_resource) REFERENCES resources(id_resource)
);

INSERT INTO resources (title, url_resource, description, level)
VALUES (
    'ESERO – Del Espacio al Aula',
    'https://esero.es/',
    'La Oficina Europea de Recursos para la Educación Espacial en España (ESERO Spain). ESERO proporciona formación gratuita y homologada para el profesorado, además participamos en congresos, ferias y conferencias donde presentamos nuestras últimas novedades.',
    'Profesorado'
),
(
    'Telescopio Espacial Hubble',
    'https://hubblesite.org/recursos-en-espanol',
    'Recursos en español sobre el telescopio espacial Hubble y la ciencia detrás de él. La web principal está en inglés y en ella puedes encontrar las mejores imágenes astronómicas para estudiar el universo, realizadas por el telescopio espacial Hubble',
    '1º Bachillerato, 1º ESO, 4º ESO'
),
(
    'Surcando el Cosmos',
    'https://www.elmundo.es/especiales/2009/06/ciencia/astronomia/index.html',
    'Portal que estudia el Cosmos desde Galileo hasta nuestros tiempo. Con vídeos e imágenes obtenidas por satélites. Hitos de la astronomía. Estudio del Sistema Solar.',
    '2º Bachillerato'
),
(
    'Cosmoeduca',
    'https://outreach.iac.es/cosmoeduca/gravedad/index.html',
    'Material didáctico para trabajar contenidos relacionados con la gravitación. Incluye además cinco pequeños apartados denominados "física avanzada", y que son una extensión opcional. Además, cuenta con propuestas de "experimentos caseros" fáciles de desarrollar en el aula para que el alumnado visualice los conceptos.',
    '1º Bachillerato, 4º ESO'
),
(
    'Recursos educativos de la NASA',
    'https://spaceplace.nasa.gov/sp/',
    'Página de la NASA tanto en inglés como en castellano con recursos educativos como juegos, manualidades, actividades.. sobre el espacio, la Tierra, el sistema solar, ciencia y tecnología.',
    '1º ESO, 2º ESO'
),
(
    'Astronomía para niños.',
    'http://ntic.educacion.es/w3/eos/MaterialesEducativos/mem2000/astronomia/chicos/index.html',
    'Este recurso desarrolla las características que definen a cada uno de los planetas, permite profundizar en el origen del Sistema Solar, indagar en diferentes curiosidades astronómicas como el calendario actual o comprender por qué existen las estaciones.',
    '1º ESO'
);

INSERT INTO author (name_author, url_author, fk_resource)
VALUES ('ESERO España','https://esero.es/quienes-somos/', 1),
('Hubble Site', 'https://hubblesite.org/', 2),
('El Mundo Diario Online', 'https://www.elmundo.es/', 3),
('María Concepción Anguita y Carmen del Puerto Varela', 'https://outreach.iac.es/cosmoeduca/creditos.html', 4),
('NASA','https://science.nasa.gov/', 5),
('Antonio Berciano Alonso/INTEF','https://intef.es/', 6);
