import GoogleProvider from "next-auth/providers/google";
import { db } from "../db";
import { users } from "../db/schema";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile, token: any) {
        const data = {
          fname: profile.given_name,
          lname: profile.family_name,
          email: profile.email,
          provider: "GOOGLE",
          external_id: profile.sub,
          image: profile.picture,
        };
        try {
          const user = await db
            .insert(users)
            .values(data)
            .onConflictDoUpdate({ target: users.email, set: data })
            .returning();

          return {
            ...data,
            name: data.fname,
            id: String(user[0].id),
            role: user[0].role,
          };
        } catch (error) {
          console.log(error);
          return { id: "" };
        }
      },
    }),
  ],
  callbacks: {
    session(data: any) {
      return data;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
};
