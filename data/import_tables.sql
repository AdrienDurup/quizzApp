-- -----------------------------------------------------
-- Schema oquiz
-- -----------------------------------------------------
-- Par convention on va nommer toutes les tables au singulier, en minuscule et en anglais.
-- Chaque table contiendra un champs created_at contenant la date de création d'un enregistrement
-- Et un champ updated_at contenant la date de mise à jour de cet enregistrement
-- Création d'une transaction, c'est un groupe d' instruction SQL
-- qui rends celles-ci dépéndantes les unes des autres. 
-- Si au moins une des instructions génère une erreur, 
-- alors toutes les commandes sont invalidés
BEGIN;

-- Comme c'est un script de création de tables ont s'assure que celles-ci
-- Soit supprimées avant de les créées.
-- On peut supprimer plusieurs tables en même temps
DROP TABLE IF EXISTS "level",
"answer",
"user",
"quiz",
"question",
"tag",
"quiz_has_tag";

-- -----------------------------------------------------
-- Table "level"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "level" (
  -- une clé primaire est automatiquement NOT NULL. Pas besoin de le préciser.
  -- 
  -- afin d'utiliser la génération automatique d'un identifiant on utilise une colonne de type serial (Attention désormais on utilisera plutôt GENERATED ALWAYS AS IDENTITY)
  -- https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_serial
  -- Mais dans notre projet on utilise serial car sequelize utilise encore serial…
  -- 
  -- serial est un pseudo-type c'est a dire qu'en fait lorsque l'on met "serial"
  -- cela corresponspond en fait à :
  -- integer NOT NULL DEFAULT nextval('"level_id_seq"'::regclass)
  -- faisant référence à la sequence nommé level_id_seq, mais tout cela est automatique à la création.
  --
  "id" serial PRIMARY KEY,
  "name" text NOT NULL
);

-- -----------------------------------------------------
-- Table "answer"
-- -----------------------------------------------------
-- On ne peut pas référencé le champ id de la table question ici, car la table n'existe pas encore. On fera une modification à la fin du script pour ajouter la référence.
CREATE TABLE IF NOT EXISTS "answer" (
  "id" serial PRIMARY KEY,
  "description" text NOT NULL,
  "question_id" integer NOT NULL
);

-- -----------------------------------------------------
-- Table "app_user"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "user" (
  "id" serial PRIMARY KEY,
  "email" text NOT NULL,
  "password" text NOT NULL,
  "firstname" text NULL,
  "lastname" text NULL
);

-- -----------------------------------------------------
-- Table "quiz"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "quiz" (
  "id" serial PRIMARY KEY,
  "title" text NOT NULL,
  "description" text NULL,
  "user_id" integer NOT NULL REFERENCES "user" ("id")
);

-- -----------------------------------------------------
-- Table "question"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "question" (
  "id" serial PRIMARY KEY,
  "question" text NOT NULL,
  "anecdote" text NULL,
  "wiki" text NULL,
  "level_id" integer NOT NULL REFERENCES "level" ("id"),
  -- 'Good answer',
  "answer_id" integer NOT NULL REFERENCES "answer" ("id"),
  "quiz_id" integer NOT NULL REFERENCES "quiz" ("id")
);

-- -----------------------------------------------------
-- Table "tag"
CREATE TABLE IF NOT EXISTS "tag" (
  "id" serial PRIMARY KEY,
  "name" text NOT NULL
);

-- -----------------------------------------------------
-- Table "quiz_has_tag"
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS "quiz_has_tag" (
  "quiz_id" integer REFERENCES "quiz"("id"),
  "tag_id" integer REFERENCES "tag" ("id"),
  PRIMARY KEY ("quiz_id", "tag_id")
);

-- Maintenant on peut créer la référence vers la table question pour le champ "question_id" dans la table "answer" afin de réprésenter notre clé étrangère.
-- On remarquera ici la présence de l'instruction FOREIGN KEY qui dit explicitement que ceette colonne sert de clé étrangère faisaint référence à la colonne question de la table question
-- Lors de la création d'une table ce détail est implicite
ALTER TABLE "answer"
  ADD FOREIGN KEY ("question_id") REFERENCES "question" ("id");

-- Pour mettre fin à au bloc de transaction et l'exécuter
COMMIT;