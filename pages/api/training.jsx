import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  const { goalTime, currentTime, level, event, additionalInfo } = req.body;
  const sentence = `I want to run a ${event} in ${goalTime} and I am currently running ${currentTime} and I am a ${level} runner. ${additionalInfo}`;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(sentence);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  res.status(200).json({ text });
}
