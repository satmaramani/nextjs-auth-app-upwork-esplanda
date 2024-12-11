import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: { email: credentials?.email },
                });

                if (!user) {
                    throw new Error("No user found with the provided email");
                }

                // Verify password
                const isValidPassword = bcrypt.compareSync(credentials!.password, user.password || "");
                if (!isValidPassword) {
                    throw new Error("Invalid credentials");
                }

                // Return the user in the expected format
                return {
                    id: user.id.toString(), // Convert `id` to a string
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id.toString(); // Convert id to string if necessary
            }
            return token;
        },

        async session({ session, token }) {
            if (token?.id) {
                session.user = {
                    ...session.user,
                    id: token.id as string, // Explicitly cast token.id to string
                };
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});