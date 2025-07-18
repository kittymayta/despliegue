import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: "847674728805-dm3f6ed36u265kk6lc0alrc2sjml78ea.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: '/auth/signin',  // Ruta personalizada para la página de inicio de sesión
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});