"use client";

import React, { useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { api } from "~/utils/api";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const Search: React.FC = () => {
  const { data: sessionData } = useSession();

  const generateRecipe = api.recipe.generate.useMutation({});

  const [recipes, setRecipes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const ingredientsRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(
      `/api/recipe/?ingredients=${ingredientsRef.current?.value as string}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = (await response.json()) as string;
    setRecipes(data);
    setLoading(false);
  }

  return (
    <>
      {sessionData?.user ? (
        <>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit}
            method="post"
            className="form-control flex w-full max-w-md flex-col gap-5"
          >
            <label className="label">
              What ingredients do you have available?
            </label>
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

            <ReactMarkdown>{recipes}</ReactMarkdown>
          </article>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5">
          <h1 className="text-5xl font-bold">You need to be signed in!</h1>
          <Link
            onClick={sessionData ? () => void signOut() : () => void signIn()}
            href=""
            className="justify-between"
          >
            <button className="btn-primary btn rounded-md">Sign in</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Search;
