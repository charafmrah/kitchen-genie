import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

interface MessageData {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }
  ];
}

const prePrompt =
  "Your name is Kitchen Genie and you refer to yourself as such (don't say I'm an AI model). From the following ingredients make me a meal (in markdown): ";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fullPrompt =
    prePrompt +
    (req?.query?.ingredients ? req.query.ingredients.toString() : "");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: fullPrompt }],
      temperature: 0,
      max_tokens: 4000,
    }),
  })
    .then((res) => res.json())
    .then((data: MessageData) => {
      res.status(200).json(data.choices[0].message.content);
    })
    .catch((err) => console.log(err));
}
