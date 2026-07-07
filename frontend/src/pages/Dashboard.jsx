import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import InterviewCard from "../components/InterviewCard";

import { getInterviews } from "../services/interviewService";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterviews();
  }, []);

  const loadInterviews = async () => {
    try {
      const data = await getInterviews();

      setInterviews(data.interviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h1>Dashboard</h1>

          <Link
            to="/create-interview"
            className="btn btn-primary"
          >
            + New Interview
          </Link>

        </div>

        {interviews.length === 0 ? (
          <div className="alert alert-info">
            No Interviews Found
          </div>
        ) : (
          <div className="row">

            {interviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                interview={interview}
              />
            ))}

          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;