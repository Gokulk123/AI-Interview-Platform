const pool = require("../config/db");

const getDashboardStats = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      COUNT(DISTINCT i.id) AS total_interviews,

      COUNT(DISTINCT CASE
        WHEN i.status='completed'
        THEN i.id
      END) AS completed_interviews,

      COUNT(DISTINCT CASE
        WHEN i.status='pending'
        THEN i.id
      END) AS pending_interviews,

      COUNT(DISTINCT q.id) AS total_questions,

      COUNT(DISTINCT a.id) AS answered_questions,

      ROUND(AVG(a.ai_score),2) AS average_score

    FROM interviews i

    LEFT JOIN questions q
      ON i.id = q.interview_id

    LEFT JOIN answers a
      ON q.id = a.question_id

    WHERE i.user_id = $1
    `,
    [userId],
  );

  return result.rows[0];
};

module.exports = {
  getDashboardStats,
};