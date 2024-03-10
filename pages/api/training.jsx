import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  const { goalTime, currentTime, level, event, additionalInfo } = req.body;
  const sentence = `I want to run a ${event} in ${goalTime} minutes and I am currently running ${currentTime} minutes and I am a ${level} runner. ${additionalInfo}. Give me a deatiled training plan for 12 weeks that I can use to acheive this goal with everyday mileage given for that specfeic week. I want it ordered from monday to sunday under what week we're on. The training plan should have a workout that will help me aerobic base tuesdays and fridays every week. Tuesdays should be a tempo based workout or long intervel based workout and friday should be a speed workout with variety like 400 repeats, 8pp repeats, 1k repeats at race pace and so on. Take into account that I am a ${level} runner. When gicing back the training plan always have it in this format: **week {week number}** then a new line followed by another new line so theres a line space between the week and the days like /n/n followed by the days of the week and their training plan all seperated by a space as well.`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(sentence);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  res.status(200).json({ text });
}
