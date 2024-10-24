"use client"; // Ensure client-side rendering

import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Redirect to dashboard if user is signed in
    if (status === "authenticated") {
      window.location.href = "/dashboard";
    }
  }, [status]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Head>
        <title>Login</title>
      </Head>
      <div className="bg-white p-6 rounded shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {!session ? (
          <button
            onClick={() => signIn("google")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign in with Google
          </button>
        ) : (
          <>
            <p className="mb-4">Signed in as {session.user.email}</p>
            <p className="mb-4">Name: {session.user.name}</p>
            <p className="mb-4">Username: {session.user.username}</p>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
