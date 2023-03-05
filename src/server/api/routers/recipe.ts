import { Input } from "postcss";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
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
