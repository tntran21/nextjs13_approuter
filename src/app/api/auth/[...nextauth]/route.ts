import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@/plugins/database";
import User from "@/plugins/models/user";
import { IUserReq } from "@/core/interfaces/user";

const handle = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session, token, user }) {
    const sessionUser = await User.findOne({ email: session.user.email });

    session.user.id = sessionUser?._id.toString() || "";

    return session;
  },
  async signIn({ profile }: { profile: IUserReq }) {
    console.log("profile", profile);

    const { email, username, avatar } = profile;

    try {
      await connectToDatabase();

      // check if a user already exists
      const userExits = await User.findOne({ email });
      // If not, create a new user
      if (!userExits) {
        const newUser = new User({
          email,
          username: username.replace(" ", "").toLowerCase(),
          avatar,
        });
        await newUser.save();
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
});

export { handle as GET, handle as POST };
