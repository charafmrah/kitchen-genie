import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import Navbar from "~/components/Navbar";
import Search from "~/components/Search";

const Settings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex h-full min-h-screen w-full flex-col items-center justify-start gap-10 py-20 px-5">
        <div className="prose h-full w-full">
          <h1>Settings</h1>
        </div>
      </main>
    </>
  );
};

export default Settings;
