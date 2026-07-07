import api from "../api/axios";

export const getInterviews = async () => {
  const { data } = await api.get("/interviews");
  return data;
};

export const createInterview = async (interviewData) => {
  const { data } = await api.post("/interviews", interviewData);
  return data;
};

export const getInterviewDetails = async (id) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data;
};

export const generateQuestions = async (id) => {
  const response = await api.post(`/interviews/${id}/generate`);

  return response.data;
};
