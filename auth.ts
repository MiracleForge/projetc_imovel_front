"server-only"

import "server-only";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { createFetcher } from "@/src/utils/fetchData";
import { loginPayload } from "@/src/contracts/types/payloads.authentication";
import { NextAuthCustomError } from "./src/errors/constructors/core.erros";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    Credentials({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        const path = "/auth/routes/access/login";
        const fetchLogin = createFetcher<loginPayload, User>(path, { method: "POST" });

        const response = await fetchLogin({
          email: credentials.email as string,
          password: credentials.password as string,
          remember: true
        });

        if (response.error) {
          throw new NextAuthCustomError(response.message || "Erro desconhecido, tente novamente mais tarde");
        }

        if (!response.data) return null;

        const user = response.data;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/entrar",
    error: "/auth/entrar?error=1",
  },
});
