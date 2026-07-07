const pool = require("../config/db");

const saveInterview = async (userId, jobRole, experience, difficulty) => {
  const query = `INSERT INTO interviews(user_id, job_role, experience, difficulty) VALUES($1,$2,$3,$4) RETURNING *`;
  const values = [userId, jobRole, experience, difficulty];
  const result = await pool.query(query, values);

  return result.rows[0];
};

const findInterviewById = async (id) => {
  const result = await pool.query(
    `
     SELECT * FROM interviews WHERE id=$1
  `,
    [id],
  );

  return result.rows[0];
};

const getUserInterviews = async (userId) => {
  const result = await pool.query(
    `
     SELECT * FROM interviews WHERE user_id=$1 ORDER BY created_at DESC
    `,
    [userId],
  );
  return result.rows;
};

const getInterviewDetails = async (interviewId, userId) => {
  const query = `
     SELECT
     i.id AS interview_id,
     i.job_role,
     i.experience,
     i.difficulty,
     i.status,

     q.id AS question_id,
     q.question,
     q.expected_answer,

     a.user_answer,
     a.ai_score,
     a.ai_feedback

     FROM interviews i

     LEFT JOIN questions q
        ON i.id = q.interview_id

     LEFT JOIN answers a
        ON q.id = a.question_id
      
     WHERE i.id = $1
        AND i.user_id = $2

     ORDER BY q.id
    
  `;

  const result = await pool.query(query, [interviewId, userId]);
  return result.rows;
};
module.exports = {
  saveInterview,
  findInterviewById,
  getUserInterviews,
  getInterviewDetails,
};
