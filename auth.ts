import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/entrar",        // caso tente acessar algo sem estar logado
    error: "/auth/entrar?error=1", // erros de login
  },
});
