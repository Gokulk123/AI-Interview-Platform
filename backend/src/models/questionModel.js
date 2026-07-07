const pool = require("../config/db");

const saveQuestions = async (interviewId, questions) => {
  for (const item of questions) {
    await pool.query(
      `INSERT INTO questions(interview_id,question,expected_answer) VALUES($1,$2,$3)`,
      [interviewId, item.question, item.expectedAnswer],
    );
  }
  return true;
};

module.exports = {
  saveQuestions,
};
