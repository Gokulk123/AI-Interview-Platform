const Interview = require("../models/interviewModel");
const Question = require("../models/questionModel");
const { generateQuestions } = require("../services/groqService");

const createInterview = async (req, res) => {
  try {
    const { job_role, experience, difficulty } = req.body;
    const userId = req.user.id;
    const response = await Interview.saveInterview(
      userId,
      job_role,
      experience,
      difficulty,
    );

    res.status(201).json({
      message: "Interview created successfully",
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const generateInterviewQuestions = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const interview = await Interview.findInterviewById(interviewId);
    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const questions = await generateQuestions(
      interview.job_role,
      interview.experience,
      interview.difficulty,
    );

    await Question.saveQuestions(interview.id, questions);

    res.status(200).json({
      message: "Questions generated successfully",
      questions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserInterviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const interviews = await Interview.getUserInterviews(userId);
    res.status(200).json({
      count: interviews.length,
      interviews,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInterviewDetails = async (req, res) => {
  try {
    const interviewId = req.params.id;
    const userId = req.user.id;

    const interviewDetails = await Interview.getInterviewDetails(
      interviewId,
      userId,
    );

    if (interviewDetails.length === 0) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    const response = {
      interview: {
        id: interviewDetails[0].interview_id,
        job_role: interviewDetails[0].job_role,
        experience: interviewDetails[0].experience,
        difficulty: interviewDetails[0].difficulty,
        status: interviewDetails[0].status,
        created_at: interviewDetails[0].created_at,
        questions: [],
      },
    };

    interviewDetails.forEach((row) => {
      if (row.question_id) {
        response.interview.questions.push({
          id: row.question_id,
          question: row.question,
          expected_answer: row.expected_answer,
        });
      }
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createInterview,
  generateInterviewQuestions,
  getUserInterviews,
  getInterviewDetails,
};
