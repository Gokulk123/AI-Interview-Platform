import { useNavigate } from "react-router-dom";

const InterviewCard = ({ interview }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">

        <div className="card-body">

          <h4 className="card-title mb-3">
            {interview.job_role}
          </h4>

          <p>
            <strong>Experience:</strong>{" "}
            {interview.experience} Years
          </p>

          <p>
            <strong>Difficulty:</strong>{" "}
            {interview.difficulty}
          </p>

          <span
            className={`badge ${
              interview.status === "completed"
                ? "bg-success"
                : "bg-warning text-dark"
            }`}
          >
            {interview.status}
          </span>

        </div>

        <div className="card-footer bg-white border-0">

          <button
            className="btn btn-primary w-100"
            onClick={() =>
              navigate(`/interview/${interview.id}`)
            }
          >
            View Interview
          </button>

        </div>

      </div>
    </div>
  );
};

export default InterviewCard;