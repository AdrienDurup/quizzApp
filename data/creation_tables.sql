-- --------------------------------------------
-- Création des tables pour l'application oQuiz
-- --------------------------------------------

-- par convention, on nomme nos tables au singulier, en anglais, en minuscule et en snake_case
-- dans certains cas, on devra échapper des noms de table ou de champ avec des double quotes afin d'éviter des confusions entre un élément de notre structure et un mot-clé réservé de postgres ou de SQL

-- --------------------------------------------

-- on va sécuriser notre script en effectuant une transaction

-- BEGIN;
-- nos requêtes SQL
-- COMMIT;

-- les requêtes vont être "prédigérées" par postgres avant d'être véritablement envoyées au serveur
-- ainsi, en cas d'erreur, de pépin, d'explosion nucléaire, même à la dernière requête, la transaction entière va être annulée
-- pas de risque que le fichier soit partiellement exécuté, c'est tout ou rien

-- début de la transaction
BEGIN;

-- avant de créer les tables, par sécurité, on supprime les tables éventuellement existantes

DROP TABLE IF EXISTS "level", "user", quiz, tag, question, answer, quiz_has_tag;

-- on est sûr que la BDD est toute propre, on peut commencer la création des tables

-- pour tous nos champs id, nos clé primaires, on va utiliser le type SERIAL
-- ce type est un pseudo type, c'est en fait un INTEGER NOT NULL relié à une table interne qui permet de l'incrémenter à chaque nouvel enregistrement
-- la "vraie" syntaxe serait id INTEGER NOT NULL DEFAULT nextval("<table>_id_seq"::regclass)

-- --------------------------------------------
-- table level
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS "level" (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);


-- --------------------------------------------
-- table tag
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS tag (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- --------------------------------------------
-- table user
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    "password" TEXT NOT NULL,
    firstname TEXT,
    lastname TEXT
);


-- --------------------------------------------
-- table quiz
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS quiz (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    "description" TEXT,
    -- on définit la clé étrangère directement à la création de la table avec REFERENCES <table>(<champ>)
    -- par convention, ce champ est nommé <table>_<champ>
    user_id INTEGER NOT NULL REFERENCES "user"(id)
);

-- --------------------------------------------
-- table question
-- --------------------------------------------

-- on ne eut pas créer ici la référence vers la bonne réponse : la table answer n'a pas encore été créée
-- on pourra rajouter cette info dans un 2ème temps, après la création de la table answer

CREATE TABLE IF NOT EXISTS question (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    anecdote TEXT,
    wiki TEXT,
    level_id INTEGER NOT NULL REFERENCES "level"(id),
    quiz_id INTEGER NOT NULL REFERENCES quiz(id),
    answer_id INTEGER
);

-- --------------------------------------------
-- table answer
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS answer (
    id SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL,
    question_id INTEGER NOT NULL REFERENCES question(id)
);


-- toutes les tables nécessaires sont créées, on peut maintenant ajouter l'info de clé étrangère sur le champ answer_id de question
ALTER TABLE question
    ADD FOREIGN KEY(answer_id) REFERENCES answer(id);


-- --------------------------------------------
-- table quiz_has_tag
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS quiz_has_tag (
    quiz_id INTEGER NOT NULL REFERENCES quiz(id),
    tag_id INTEGER NOT NULL REFERENCES tag(id),
    -- on ne peut pas utiliser les mots-clé PRIMARY KEY sur plusieurs champs directement
    -- pour indiquer une clé primaire sur plusieurs champs, on la définit à part, apès les champs
    PRIMARY KEY (quiz_id, tag_id)
);


quiz_id tag_id
1       3
1       5
1       7
3       7
9       7


-- aucun erreur, envoi des requêtes incluses dans la transaction au SGBD
COMMIT;