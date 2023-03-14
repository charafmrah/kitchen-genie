import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

import Navbar from "~/components/Navbar";
import Search from "~/components/Search";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const generateRecipe = api.recipe.generate.useQuery({});

  return (
    <>
      <Head>
        <title>Kitchen Genie</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="w-full">
        <div className="flex h-full flex-wrap items-start justify-center gap-20 py-10 px-5 lg:gap-32 lg:py-20">
          {sessionData?.user ? (
            <Search />
          ) : (
            <div className="flex flex-col items-center justify-center gap-5 text-center">
              <h1 className="text-5xl font-bold">You need to be signed in!</h1>
              <Link
                onClick={(event) => {
                  event.preventDefault();
                  void signIn();
                }}
                href="/api/auth/"
              >
                <button className="btn-primary btn rounded-md">Sign in</button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
