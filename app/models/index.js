import { Answer } from "./answer";
import { Level } from "./level";
import { Question } from "./question";
import { Quizz } from "./quizz";
import { Tag } from "./tag";
import { User } from "./user";

User.hasMany(Quizz, {
	foreignKey: "user_id",
	as: "quizz",
});

Quizz.belongsTo(User, {
	foreignKey: "user_id",
	as: "author",
});

Quizz.hasMany(Question, {
	foreignKey: "quizz_id",
	as: "questions",
});

Question.belongsTo(Quizz, {
	foreignKey: "quizz_id",
	as: "quizz",
});

Level.hasMany(Question, {
	foreignKey: "level_id",
	as: "questions",
});

Question.belongsTo(Level, {
	foreignKey: "level_id",
	as: "level",
});

Question.hasMany(Answer, {
	foreignKey: "question_id",
	as: "answers",
});

Answer.belongsTo(Question, {
	foreignKey: "question_id",
	as: "question",
});

Quizz.belongsToMany(Tag, {
	foreignKey: "quizz_id",
	otherKey: "tag_id",
	as: "tags",
	through: "quizz_has_tag",
});

Tag.belongsToMany(Quizz, {
	foreignKey: "tag_id",
	otherKey: "quizz_id",
	as: "quizzes",
	through: "quizz_has_tag",
});

Question.belongsTo(Answer, {
	foreignKey: "answer_id",
	as: "good_answer",
});

export const index = {
	Answer,
	Level,
	Question,
	Quizz,
	Tag,
	User,
};
