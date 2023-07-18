import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handle = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session, token, user }) {
    // session.user.id = user.id;
    // return session;
  },
  async signIn({ email, password }) {
    try {
      // serverless
    } catch (error) {}
  },
});

export { handle as GET, handle as POST };
