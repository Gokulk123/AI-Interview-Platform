const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateQuestions = async (jobRole, experience, difficulty) => {
  const prompt = `
  Generate exactly 10 technical interview questions.

  Job Role: ${jobRole},
  Expeience:${experience} years,
  Difficulty: ${difficulty}

  Return ONLY valid JSON.

Format:

[
  {
    "question":"",
    "expectedAnswer":""
  }
]

Do not include markdown.
Do not include explanations.
Do not include text outside JSON.
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
};

const evaluateAnswer = async (question, expectedAnswer, userAnswer) => {
  const prompt = `
      You are an experienced technical interviewer.
      Question : ${question}
      Expected Answer : ${expectedAnswer}
      Candidate Answer : ${userAnswer}

      Evaluate the candidate's answer.

Return ONLY valid JSON.

Format:

{
  "score": 0,
  "feedback": ""
}

Rules:
- Score must be between 0 and 10.
- Feedback should be constructive.
- Do not return markdown.
- Do not return explanations outside JSON.
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2
  });

  const content = response.choices[0].message.content;
  return JSON.parse(content);
};

module.exports = {
  generateQuestions,
  evaluateAnswer,
};
