"use server";

import { signIn, signOut } from "@/auth";


export async function handleGitHubSignIn() {
  return signIn("github", { callbackUrl: "/" });
}

export async function handleGitHubSignOut() {
  return signOut();
}

