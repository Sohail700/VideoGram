import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectedToDatabase } from "./db";
import User from "@/models/User";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email && !credentials?.password) {
          throw new Error("Missing email or password!");
        }

        try {
          await connectedToDatabase();
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("No user found with this credential");
          }
        } catch (error) {}
      },
    }),
  ],
};
