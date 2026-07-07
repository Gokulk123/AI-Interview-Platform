const Answer = require("../models/answerModel");

const { evaluateAnswer } = require("../services/groqService");

const submitAnswer = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { userAnswer } = req.body;
    const question = await Answer.findQuestionById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    const evaluation = await evaluateAnswer(
      question.question,
      question.expected_answer,
      userAnswer,
    );

    const savedAnswer = await Answer.saveAnswer(
      question.id,
      userAnswer,
      evaluation.score,
      evaluation.feedback,
    );

    res.status(201).json({
      message: "Answer evaluated successfully",
      result: savedAnswer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  submitAnswer,
};
