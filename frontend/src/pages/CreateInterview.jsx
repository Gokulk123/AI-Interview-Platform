import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createInterview } from "../services/interviewService";
import { toast } from "react-toastify";

const CreateInterview = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    job_role: "",
    experience: "",
    difficulty: "Easy",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.job_role.trim()) {
      setError("Job Role is required");
      return;
    }

    if (!formData.experience) {
      setError("Experience is required");
      return;
    }

    try {
      setLoading(true);

      await createInterview(formData);

      toast.success("Interview Created Successfully");

      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="row justify-content-center">

          <div className="col-md-6">

            <div className="card shadow">

              <div className="card-header bg-primary text-white">

                <h3>Create Interview</h3>

              </div>

              <div className="card-body">

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label className="form-label">
                      Job Role
                    </label>

                    <input
                      type="text"
                      name="job_role"
                      className="form-control"
                      placeholder="React Developer"
                      value={formData.job_role}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="mb-3">

                    <label className="form-label">
                      Experience
                    </label>

                    <input
                      type="number"
                      name="experience"
                      className="form-control"
                      placeholder="2"
                      value={formData.experience}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label">
                      Difficulty
                    </label>

                    <select
                      name="difficulty"
                      className="form-select"
                      value={formData.difficulty}
                      onChange={handleChange}
                    >
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                    </select>

                  </div>

                  <button
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating Interview..."
                      : "Create Interview"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default CreateInterview;