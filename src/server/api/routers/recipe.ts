import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env.mjs";

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const prePrompt =
  "From the following ingredients, I would like you to make a recipe: ";

async function getCompletion(prompt: string) {
  console.log(prompt);
  return await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: prePrompt + prompt,
    temperature: 0,
    max_tokens: 7,
  });
}

export const recipeRouter = createTRPCRouter({
  generate: protectedProcedure.input(z.string()).mutation(async ({ input }) => {
    const response = await getCompletion(input).catch((err) => {
      console.log(err);
    });
    return response;
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
