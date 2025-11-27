// auth.ts
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        user: { label: "User", type: "text" },
      },
      authorize: async (credentials) => {
        console.log("🔍 Authorize chamado!"); // AGORA VAI APARECER
        console.log("Credentials recebidas:", credentials);

        if (!credentials?.user) {
          console.log("❌ Sem credenciais");
          return null;
        }

        try {
          const user = JSON.parse(credentials.user as string);
          console.log("✅ Usuário parseado:", user);

          // Retorne o objeto de usuário que será salvo na sessão
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            // outros campos necessários
          };
        } catch (error) {
          console.error("❌ Erro ao parsear usuário:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("🎫 JWT callback:", { token, user });
      if (user) {
        token.id = user.id;
        token.email = user.email;
        // adicione outros dados necessários
      }
      return token;
    },
    async session({ session, token }) {
      console.log("📋 Session callback:", { session, token });
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/entrar", // sua página de login
  },
})
