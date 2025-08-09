import OpenAI from "openai";

export function createOpenAI() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set in env");
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}
