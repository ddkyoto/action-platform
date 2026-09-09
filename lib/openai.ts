import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePetitionReport(
  petitionTitle: string,
  petitionDescription: string,
  comments: string[]
): Promise<{ summary: string; draftEmail: string }> {
  const commentsText = comments.slice(0, 5).join("\n");

  const summaryResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a professional policy analyst creating objective summaries of community petitions.",
      },
      {
        role: "user",
        content: `Create an objective summary of this petition for government officials:\n\nTitle: ${petitionTitle}\n\nDescription: ${petitionDescription}\n\nCommunity Comments:\n${commentsText}`,
      },
    ],
    max_tokens: 500,
  });

  const summary =
    summaryResponse.choices[0]?.message?.content || "Unable to generate summary";

  const emailResponse = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "You are a professional policy communications specialist. Draft a respectful, formal email to a government official about a community petition.",
      },
      {
        role: "user",
        content: `Draft an email to a government official about this petition:\n\n${petitionTitle}\n\nSummary: ${summary}`,
      },
    ],
    max_tokens: 500,
  });

  const draftEmail =
    emailResponse.choices[0]?.message?.content || "Unable to generate email";

  return { summary, draftEmail };
}
