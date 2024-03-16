import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export default async function handler(req, res) {
  const { prompt } = req.body;
  const extendedPrompt =
    prompt +
    ". In addition just give me back a list of excersises that incorporate bodyweight excersises and weighted excersises. Just return me a list of excersises that I can do to prevent injury and nothing else, no cooldown no warmup or additional notes.";

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(extendedPrompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  res.status(200).json({ text });
}
