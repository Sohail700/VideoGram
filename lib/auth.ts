import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { text } from "stream/consumers";

export const authOption:NextAuthOptions = {
  providers: [    
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials) {
        if(!credentials?.email && !credentials?.password){
          throw new Error("Missing email or password!")
        }
      }

      try {
        
      } catch (error) {
        
      }
    })
  ]
}
