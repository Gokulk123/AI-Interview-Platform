const pool = require("../config/db");

const findQuestionById = async (questionId) => {
  const result = await pool.query(`SELECT * FROM questions WHERE id=$1 `, [
    questionId,
  ]);

  return result.rows[0];
};

const saveAnswer = async (questionId, userAnswer, score, feedback) => {
  const query = `INSERT INTO answers(question_id,user_answer,ai_score,ai_feedback) VALUES($1,$2,$3,$4) RETURNING *`;
  const values = [questionId, userAnswer, score, feedback];
  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
  findQuestionById,
  saveAnswer,
};
