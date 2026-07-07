import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getInterviewDetails,
  generateQuestions,
} from "../services/interviewService";

import { submitAnswer } from "../services/answerService";
import Loading from "../components/Loading";

const InterviewDetails = () => {
  const { id } = useParams();

  const [interview, setInterview] = useState(null);

  const [loading, setLoading] = useState(true);

  const [generating, setGenerating] = useState(false);

  const [answers, setAnswers] = useState({});

  const [evaluations, setEvaluations] = useState({});

  const loadInterview = async () => {
    try {
      const data = await getInterviewDetails(id);

      setInterview(data.interview);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadInterview();
  }, []);
  const handleGenerateQuestions = async () => {
    try {
      setGenerating(true);

      await generateQuestions(id);

      await loadInterview();
    } catch (error) {
      console.log(error);
    } finally {
      setGenerating(false);
    }
  };

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (questionId) => {
    try {
      const data = await submitAnswer(questionId, answers[questionId]);

      setEvaluations((prev) => ({
        ...prev,
        [questionId]: data.result,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Link to="/dashboard" className="btn btn-secondary mb-4">
          ← Back
        </Link>

        <div className="card shadow mb-4">
          <div className="card-body">
            <h2>{interview?.job_role}</h2>

            <p>
              <strong>Experience :</strong> {interview?.experience} Years
            </p>

            <p>
              <strong>Difficulty :</strong> {interview?.difficulty}
            </p>

            <p>
              <strong>Status :</strong> {interview?.status}
            </p>

            {interview?.questions.length === 0 && (
              <button
                className="btn btn-primary"
                disabled={generating}
                onClick={handleGenerateQuestions}
              >
                {generating ? "Generating..." : "Generate Questions"}
              </button>
            )}
          </div>
        </div>

        {interview?.questions.map((question, index) => (
          <div className="card shadow-sm mb-4" key={question.id}>
            <div className="card-body">
              <h4>Question {index + 1}</h4>

              <p>{question.question}</p>

              <textarea
                rows="5"
                className="form-control"
                placeholder="Write your answer..."
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleChange(
                    question.id,

                    e.target.value,
                  )
                }
              />

              <button
                className="btn btn-success mt-3"
                onClick={() => handleSubmit(question.id)}
              >
                Submit Answer
              </button>

              {evaluations[question.id] && (
                <div className="alert alert-success mt-3">
                  <h5>Score : {evaluations[question.id].ai_score}/10</h5>

                  <p>{evaluations[question.id].ai_feedback}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default InterviewDetails;
