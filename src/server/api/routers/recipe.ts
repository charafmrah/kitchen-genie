import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

async function getCompletion(prompt: string) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "From the following ingredients, I would like you to make a recipe: ",
    },
    { role: "user", content: prompt },
    { role: "assistant", content: "ChatGPT Response here" },
  ];
  const chatGPT = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });

  return chatGPT?.data?.choices[0]?.message;
}

export const recipeRouter = createTRPCRouter({
  generate: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const completion = await getCompletion(input);
      if (completion) {
        return completion;
      }
      return "The genie is sleeping";
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        cookTime: z.string(),
        prepTime: z.string(),
        ingredients: z.string(),
        instructions: z.string(),
        mealType: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.recipe.create({
        data: {
          name: input.name,
          cookTime: input.cookTime,
          prepTime: input.prepTime,
          ingredients: input.ingredients,
          instructions: input.instructions,
          userId: ctx.session.user.id,
        },
      });
    }),
});
