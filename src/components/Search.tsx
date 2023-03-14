"use client";

import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { ClimbingBoxLoader } from "react-spinners";
import { api } from "~/utils/api";

const Search: React.FC = () => {
  const [recipes, setRecipes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const ingredientsRef = useRef<HTMLTextAreaElement>(null);

  const generateRecipe = api.recipe.generate.useQuery(
    ingredientsRef.current?.value === ""
      ? (ingredientsRef.current.value as string)
      : "Tomato soup"
  );

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setRecipes("");
    setLoading(true);
    /*const response = await fetch(
      `/api/recipe/?ingredients=${ingredientsRef.current?.value as string}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = (await response.json()) as string;*/
    await generateRecipe.refetch();
    console.log(generateRecipe);

    setRecipes(generateRecipe.data as string);
    setLoading(false);
  }

  return (
    <>
      {JSON.stringify(generateRecipe, null, 2)}
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
        method="post"
        className="form-control flex w-full max-w-md flex-col gap-5"
      >
        <label className="label">What ingredients do you have available?</label>
        <textarea
          ref={ingredientsRef}
          className="textarea-bordered textarea rounded-md lg:min-h-[50vh]"
          placeholder="Tomatoes, onions, garlic, olive oil, salt, pepper, etc."
        ></textarea>

        <button className="btn-secondary btn rounded-md">
          Generate recipe
        </button>
      </form>
      <article className="prose">
        <h2>Genie Generated Recipe:</h2>

        {loading && (
          <div className="my-5 flex w-full justify-center lg:justify-start">
            <ClimbingBoxLoader className="" size={25} color="pink" />
          </div>
        )}
        <ReactMarkdown>{recipes}</ReactMarkdown>
      </article>
    </>
  );
};

export default Search;
