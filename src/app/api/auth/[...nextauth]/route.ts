import NextAuth, { type Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@/plugins/database";
import User from "@/plugins/models/user";

interface GoogleProfile extends Profile {
  picture: string;
}

const handle = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const sessionUser = await User.findOne({ email: session?.user?.email });

      session.user.id = sessionUser?._id.toString() || "";

      return session;
    },
    async signIn({ profile }: { profile: GoogleProfile | undefined }): Promise<boolean> {
      console.log("PROFILE", profile);

      const { email, name, picture } = profile ?? {};
      try {
        await connectToDatabase();

        // check if a user already exists
        const userExits = await User.findOne({ email });
        // If not, create a new user
        if (!userExits) {
          const newUser = new User({
            email,
            username: name?.replace(" ", "").toLowerCase(),
            avatar: picture,
          });
          await newUser.save();
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handle as GET, handle as POST };
