import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  const { feedback, info } = req.body;
  //   console.log(feedback, info);
  info.map((week, index) => {
    console.log(week.week, week.days);
  });

  const prompt = `Rewrite the training plan based on the following weeks:\n${info
    .map((week) => `Week: ${week.week}, Days: ${week.days.join(", ")}`)
    .join(
      "\n"
    )}, based on the feedback: ${feedback}. Keep the same structure of the week with workouts on tuesday and friday. Make sure to take into account the user's feedback and make the training plan a better fit for our users. Only return the training plan and nothing else. Also make sure when returning the training plan to have it in this format: **week {week number}** then a new line followed by another new line so theres a line space between the week and the days like /n/n followed by the days of the week and their training plan all seperated by a space as well.`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  res.status(200).json({ trainingPlan: text });
}
