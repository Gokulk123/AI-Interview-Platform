import api from "../api/axios";

export const submitAnswer = async (questionId, userAnswer) => {
  const response = await api.post(
    `/questions/${questionId}/answer`,
    {
      userAnswer,
    }
  );

  return response.data;
};